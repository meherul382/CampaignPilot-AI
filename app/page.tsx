"use client";

import { useMemo, useState } from "react";

type Plan = { angle: string; primary: string; headlines: string[]; audience: string[]; cta: string; score: number };

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
  const [generated, setGenerated] = useState(false);

  const score = useMemo(() => Math.min(96, Math.round(54 + product.length * 1.5 + description.length / 4)), [product, description]);

  const plan: Plan = useMemo(() => {
    const name = product || "your product";
    const benefit = description.trim() || "a simpler solution for your customers' needs";
    return {
      angle: `Lead with the clearest customer benefit: ${benefit.slice(0, 140)}. Keep the offer simple and test different hooks.`,
      primary: `Looking for ${name}? Discover a practical way to get started with ${name}. ${description ? description.slice(0, 150) : "Show the main benefit, explain why it matters, and give people one clear next step."} See the details and take the next step today.`,
      headlines: [`Discover ${name}`, `${name}: A smarter way to start`, `See what ${name} can do`],
      audience: ["Broad prospecting audience", "Problem/intent-based audience", "Warm visitors or engaged users"],
      cta: objective === "Leads" ? "Sign Up" : objective === "Traffic" ? "Learn More" : objective === "Engagement" ? "Learn More" : "Shop Now",
      score,
    };
  }, [product, description, objective, score]);

  function generatePlan() {
    setGenerated(true);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">Campaign<span>Pilot AI</span></div>
        <div className="navlinks"><a href="#features">Features</a><a href="#workspace">Builder</a><a href="#how">How it works</a><a href="#workspace">Dashboard</a></div>
      </nav>

      <div className="wrap">
        <section className="hero">
          <div className="heroCard">
            <span className="eyebrow">ZERO-COST MVP MODE</span>
            <h1>Build better campaigns from one product brief.</h1>
            <p>CampaignPilot AI turns your product, landing page and offer into a campaign-ready plan. Start without a paid AI API, review everything, then connect real AI and Meta later.</p>
            <div className="actions"><a className="btn primary" href="#workspace">Build my campaign</a><a className="btn secondary" href="#features">Explore features</a></div>
          </div>
          <div className="score">
            <small>Campaign readiness</small>
            <strong>{score}%</strong>
            <span>Build → review → publish. No fake ad publishing.</span>
          </div>
        </section>

        <section id="features" className="grid">
          {features.map((f) => <div className="panel card" key={f.title}><h3>{f.title}</h3><p className="muted">{f.text}</p></div>)}
        </section>

        <section id="how" className="how panel">
          <div><span className="eyebrow">HOW IT WORKS</span><h2>Brief → Plan → Review → Publish</h2></div>
          <div className="steps"><span><b>01</b> Add product</span><span><b>02</b> Generate plan</span><span><b>03</b> Review creatives</span><span><b>04</b> Connect Meta later</span></div>
        </section>

        <section id="workspace" className="workspace">
          <aside className="panel sidebar">
            <div className="sectionTitle"><h2>Campaign brief</h2><span className="pill">Free MVP</span></div>
            <div className="field"><label>Product name</label><input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Timing Booster Capsule" /></div>
            <div className="field"><label>Landing page URL</label><input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://yourwebsite.com/product" /></div>
            <div className="field"><label>Product description</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="What is it, who is it for, and what makes it useful?" /></div>
            <div className="field"><label>Campaign objective</label><select value={objective} onChange={(e)=>setObjective(e.target.value)}><option>Sales</option><option>Leads</option><option>Traffic</option><option>Engagement</option></select></div>
            <div className="field"><label>Daily budget (USD)</label><input type="number" min="1" value={budget} onChange={(e)=>setBudget(e.target.value)} /></div>
            <button className="btn primary full" onClick={generatePlan}>Generate campaign plan</button>
            <p className="tiny">Starter generation runs locally in your browser, so there is no AI API bill for this MVP.</p>
          </aside>

          <section className="panel content" id="results">
            <div className="sectionTitle"><div><h2>Campaign workspace</h2><p className="muted">Review your plan before any real ad platform connection.</p></div><span className="pill">Draft</span></div>
            {!generated ? <div className="empty"><div className="emptyIcon">✦</div><h3>Your campaign plan starts here</h3><p className="muted">Enter your product details and click Generate campaign plan.</p></div> : <div className="preview">
              <div className="previewTop"><div><strong>{product || "Your product"} campaign</strong><p className="muted">{objective} · ${budget}/day · {url || "No landing page URL"}</p></div><span className="ready">{plan.score}% ready</span></div>
              <div className="result"><h4>Recommended angle</h4><p className="muted">{plan.angle}</p></div>
              <div className="result"><h4>Primary text</h4><p className="muted">{plan.primary}</p></div>
              <div className="result"><h4>Headlines</h4>{plan.headlines.map((h)=><span className="pill" key={h}>{h}</span>)}</div>
              <div className="result"><h4>Audience test set</h4>{plan.audience.map((a)=><span className="pill" key={a}>{a}</span>)}</div>
              <div className="result"><h4>Suggested CTA</h4><span className="cta">{plan.cta}</span></div>
              <div className="result"><h4>UTM template</h4><p className="muted">{`utm_source=meta&utm_medium=paid_social&utm_campaign=${encodeURIComponent((product || "campaign").toLowerCase().replace(/[^a-z0-9]+/g,"-"))}&utm_content=ad-name`}</p></div>
            </div>}
            <div className="actions"><button className="btn secondary" disabled={!generated}>Save draft</button><button className="btn primary" onClick={()=>alert("Meta connection will be enabled after Meta Developer App and OAuth setup.")}>Connect Meta later</button></div>
          </section>
        </section>
      </div>
      <footer className="footer">© 2026 CampaignPilot AI · Zero-cost planning MVP · Real Meta publishing will require approved Meta API access.</footer>
    </main>
  );
}
