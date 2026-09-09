"use client";

import { useMemo, useState } from "react";

type Plan = { angle: string; primary: string; headlines: string[]; audience: string[]; cta: string; score: number; format: string; market: string };

type Draft = { product: string; url: string; description: string; objective: string; budget: string; market: string; format: string };

const features = [
  { title: "Campaign Strategy", text: "Turn one product brief into a practical campaign structure." },
  { title: "Ad Copy Studio", text: "Create hooks, primary text, headlines and CTA ideas instantly." },
  { title: "Audience Planner", text: "Build audience testing ideas before you spend on ads." },
];

export default function Home() {
  const [product, setProduct] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("Sales");
  const [budget, setBudget] = useState("20");
  const [market, setMarket] = useState("Bangladesh");
  const [format, setFormat] = useState("Single image");
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  const score = useMemo(() => Math.min(96, Math.round(45 + product.length * 1.4 + description.length / 4 + (url ? 8 : 0) + (market ? 5 : 0))), [product, description, url, market]);

  const plan: Plan = useMemo(() => {
    const name = product.trim() || "your product";
    const benefit = description.trim() || "a useful solution for your customers' needs";
    const cta = objective === "Leads" ? "Sign Up" : objective === "Traffic" ? "Learn More" : objective === "Engagement" ? "Learn More" : "Shop Now";
    return {
      angle: `Lead with the clearest customer benefit: ${benefit.slice(0, 150)}. Use one promise, one proof point and one clear next step.`,
      primary: `Looking for ${name}? Discover a practical way to get started with ${name}. ${description ? description.slice(0, 170) : "Explain the main benefit in simple language and show why it matters."} See the details and take the next step today.`,
      headlines: [`Discover ${name}`, `${name}: A smarter way to start`, `See what ${name} can do`],
      audience: ["Broad prospecting", `${market} problem/intent audience`, "Warm visitors or engaged users"],
      cta,
      score,
      format,
      market,
    };
  }, [product, description, objective, score, format, market]);

  function generatePlan() {
    if (!product.trim() && !description.trim()) {
      setMessage("Add a product name or description first.");
      setGenerated(false);
      return;
    }
    setMessage("");
    setGenerated(true);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveDraft() {
    const draft: Draft = { product, url, description, objective, budget, market, format };
    localStorage.setItem("campaignpilot-draft", JSON.stringify(draft));
    setSaved(true);
    setMessage("Draft saved in this browser.");
  }

  function loadDraft() {
    const raw = localStorage.getItem("campaignpilot-draft");
    if (!raw) { setMessage("No saved draft found in this browser."); return; }
    try {
      const d = JSON.parse(raw) as Draft;
      setProduct(d.product || ""); setUrl(d.url || ""); setDescription(d.description || ""); setObjective(d.objective || "Sales"); setBudget(d.budget || "20"); setMarket(d.market || "Bangladesh"); setFormat(d.format || "Single image");
      setSaved(true); setMessage("Saved draft loaded.");
    } catch { setMessage("Could not load the saved draft."); }
  }

  function clearBrief() {
    setProduct(""); setUrl(""); setDescription(""); setObjective("Sales"); setBudget("20"); setMarket("Bangladesh"); setFormat("Single image"); setGenerated(false); setSaved(false); setMessage("");
  }

  async function copyText(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); setMessage(`${label} copied.`); } catch { setMessage("Copy is not available in this browser."); }
  }

  const campaignName = (product || "campaign").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const utm = `utm_source=meta&utm_medium=paid_social&utm_campaign=${campaignName || "campaign"}&utm_content=ad-name`;

  return (
    <main className="shell">
      <nav className="nav"><div className="brand">Campaign<span>Pilot AI</span></div><div className="navlinks"><a href="#features">Features</a><a href="#workspace">Builder</a><a href="#how">How it works</a></div><a className="navCta" href="#workspace">Start building</a></nav>
      <div className="wrap">
        <section className="hero"><div className="heroCard"><span className="eyebrow">ZERO-COST MVP MODE</span><h1>Build better campaigns from one product brief.</h1><p>Plan your campaign, creative angle, audience tests and tracking in one place. This version works without a paid AI API.</p><div className="actions"><a className="btn primary" href="#workspace">Build my campaign</a><a className="btn secondary" href="#features">Explore features</a></div></div><div className="score"><small>Campaign readiness</small><strong>{score}%</strong><span>Brief → plan → review. Real Meta publishing comes later with approved API access.</span></div></section>

        <section id="features" className="grid">{features.map((f) => <div className="panel card" key={f.title}><div className="featureIcon">✦</div><h3>{f.title}</h3><p className="muted">{f.text}</p></div>)}</section>

        <section id="how" className="how panel"><div><span className="eyebrow">HOW IT WORKS</span><h2>Brief → Plan → Review → Publish</h2><p className="muted">Everything needed for the planning stage is available without login.</p></div><div className="steps"><span><b>01</b> Add product</span><span><b>02</b> Set audience & budget</span><span><b>03</b> Generate creatives</span><span><b>04</b> Review & export</span></div></section>

        <section id="workspace" className="workspace"><aside className="panel sidebar"><div className="sectionTitle"><h2>Campaign brief</h2><span className="pill">Free MVP</span></div>
          <div className="field"><label>Product name</label><input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Timing Booster Capsule" /></div>
          <div className="field"><label>Landing page URL</label><input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://yourwebsite.com/product" /></div>
          <div className="field"><label>Product description</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="What is it, who is it for, key benefit, offer or proof?" /><div className="counter">{description.length}/500</div></div>
          <div className="field"><label>Campaign objective</label><select value={objective} onChange={(e)=>setObjective(e.target.value)}><option>Sales</option><option>Leads</option><option>Traffic</option><option>Engagement</option></select></div>
          <div className="twoFields"><div className="field"><label>Market</label><select value={market} onChange={(e)=>setMarket(e.target.value)}><option>Bangladesh</option><option>India</option><option>United States</option><option>United Kingdom</option><option>Global</option></select></div><div className="field"><label>Ad format</label><select value={format} onChange={(e)=>setFormat(e.target.value)}><option>Single image</option><option>Video</option><option>Carousel</option></select></div></div>
          <div className="field"><label>Daily budget (USD)</label><input type="number" min="1" value={budget} onChange={(e)=>setBudget(e.target.value)} /></div>
          <button className="btn primary full" onClick={generatePlan}>✦ Generate campaign plan</button>
          <div className="miniActions"><button className="textBtn" onClick={saveDraft}>Save</button><button className="textBtn" onClick={loadDraft}>Load</button><button className="textBtn danger" onClick={clearBrief}>Clear</button></div>
          <p className="tiny">Local MVP mode: your draft stays in this browser. No paid AI API is required for this starter generator.</p>
        </aside>

        <section className="panel content" id="results"><div className="sectionTitle"><div><h2>Campaign workspace</h2><p className="muted">Review every recommendation before connecting an ad platform.</p></div><span className="pill">{saved ? "Saved draft" : "Draft"}</span></div>
          {message && <div className="notice">{message}</div>}
          {!generated ? <div className="empty"><div className="emptyIcon">✦</div><h3>Your campaign plan starts here</h3><p className="muted">Enter the brief and generate a planning package.</p><div className="checkList"><span>✓ Strategy angle</span><span>✓ Ad copy & headlines</span><span>✓ Audience tests</span><span>✓ CTA & UTM</span></div></div> : <div className="preview">
            <div className="previewTop"><div><strong>{product || "Your product"} campaign</strong><p className="muted">{objective} · {market} · ${budget}/day · {format}</p></div><span className="ready">{plan.score}% ready</span></div>
            <div className="result"><div className="resultHead"><h4>1. Campaign strategy</h4><button className="iconBtn" onClick={()=>copyText(plan.angle,"Strategy")}>Copy</button></div><p className="muted">{plan.angle}</p></div>
            <div className="result"><div className="resultHead"><h4>2. Primary ad text</h4><button className="iconBtn" onClick={()=>copyText(plan.primary,"Primary text")}>Copy</button></div><p className="muted">{plan.primary}</p></div>
            <div className="result"><h4>3. Headlines</h4>{plan.headlines.map((h)=><span className="pill" key={h}>{h}</span>)}</div>
            <div className="result"><h4>4. Audience test set</h4>{plan.audience.map((a)=><span className="pill" key={a}>{a}</span>)}</div>
            <div className="result"><h4>5. Suggested CTA</h4><span className="cta">{plan.cta}</span></div>
            <div className="result"><div className="resultHead"><h4>6. Tracking template</h4><button className="iconBtn" onClick={()=>copyText(utm,"UTM")}>Copy</button></div><p className="codeBox">{utm}</p></div>
            <div className="result"><h4>7. Launch checklist</h4><div className="checkList"><span>✓ Confirm landing page</span><span>✓ Prepare {format.toLowerCase()} creative</span><span>✓ Review audience and budget</span><span>✓ Check ad policy compliance</span><span>✓ Connect Meta only when ready</span></div></div>
          </div>}
          <div className="actions"><button className="btn secondary" disabled={!generated} onClick={saveDraft}>Save draft</button><button className="btn secondary" disabled={!generated} onClick={()=>copyText(`${plan.primary}\n\n${plan.headlines.join("\n")}\n\nCTA: ${plan.cta}\n\n${utm}`,"Campaign package")}>Copy campaign package</button><button className="btn primary" onClick={()=>setMessage("Meta publishing is not enabled yet. It will require a Meta Developer App, OAuth and approved Marketing API access.")}>Connect Meta later</button></div>
        </section></section>
      </div>
      <footer className="footer">© 2026 CampaignPilot AI · Zero-cost planning MVP · No login required · Real Meta publishing requires approved Meta API access.</footer>
    </main>
  );
}
