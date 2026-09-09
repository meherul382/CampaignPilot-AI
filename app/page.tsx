"use client";

import { useMemo, useState } from "react";

const features = [
  { title: "AI Campaign Strategy", text: "Turn your product brief into a structured campaign plan." },
  { title: "Ad Copy Studio", text: "Generate multiple hooks, headlines, primary text and CTAs." },
  { title: "Audience Planner", text: "Create practical audience ideas and testing angles before launch." },
];

export default function Home() {
  const [product, setProduct] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("Sales");
  const [budget, setBudget] = useState("20");
  const [generated, setGenerated] = useState(false);

  const score = useMemo(() => Math.min(94, 60 + product.length + description.length / 5), [product, description]);

  function generatePlan() {
    setGenerated(true);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">Campaign<span>Pilot AI</span></div>
        <div className="navlinks"><span>Product</span><span>How it works</span><span>Pricing</span><span>Dashboard</span></div>
      </nav>

      <div className="wrap">
        <section className="hero">
          <div className="heroCard">
            <span className="eyebrow">AI-POWERED CAMPAIGN BUILDER</span>
            <h1>Launch smarter campaigns from one product brief.</h1>
            <p>CampaignPilot AI helps you transform a product, landing page and offer into a campaign-ready strategy—with ad copy, audience ideas, budget guidance and tracking.</p>
            <div className="actions"><a className="btn primary" href="#workspace">Build my campaign</a><a className="btn secondary" href="#features">Explore features</a></div>
          </div>
          <div className="score">
            <small>Campaign readiness</small>
            <strong>{Math.round(score)}%</strong>
            <span>Build → review → publish through approved ad platform APIs.</span>
          </div>
        </section>

        <section id="features" className="grid">
          {features.map((f) => <div className="panel card" key={f.title}><h3>{f.title}</h3><p className="muted">{f.text}</p></div>)}
        </section>

        <section id="workspace" className="workspace">
          <aside className="panel sidebar">
            <div className="sectionTitle"><h2>Campaign brief</h2><span className="pill">MVP</span></div>
            <div className="field"><label>Product name</label><input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Timing Booster Capsule" /></div>
            <div className="field"><label>Landing page URL</label><input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://yourwebsite.com/product" /></div>
            <div className="field"><label>Product description</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="What is it, who is it for, and what makes it useful?" /></div>
            <div className="field"><label>Campaign objective</label><select value={objective} onChange={(e)=>setObjective(e.target.value)}><option>Sales</option><option>Leads</option><option>Traffic</option><option>Engagement</option></select></div>
            <div className="field"><label>Daily budget (USD)</label><input type="number" min="1" value={budget} onChange={(e)=>setBudget(e.target.value)} /></div>
            <button className="btn primary" style={{width:"100%"}} onClick={generatePlan}>Generate campaign plan</button>
          </aside>

          <section className="panel content" id="results">
            <div className="sectionTitle"><h2>AI campaign workspace</h2><span className="pill">Review before publish</span></div>
            <div className="preview">
              <strong>{generated ? `${product || "Your product"} campaign` : "Your generated campaign will appear here"}</strong>
              <p className="muted">{generated ? `Objective: ${objective} · Suggested starting budget: $${budget}/day · Landing page: ${url || "not provided"}` : "Add your product details on the left, then generate a strategy."}</p>
              {generated && <>
                <div className="result"><h4>Recommended angle</h4><p className="muted">Lead with one clear customer benefit, a specific proof point, and a direct call to action. Test at least 3 creative angles rather than relying on one ad.</p></div>
                <div className="result"><h4>Primary text</h4><p className="muted">Stop scrolling. Discover a simpler way to solve the problem your audience is already searching for. See how {product || "this product"} can fit into your routine today.</p></div>
                <div className="result"><h4>Headlines</h4><span className="pill">Try it today</span><span className="pill">A smarter way to get started</span><span className="pill">See the difference</span></div>
                <div className="result"><h4>Audience test set</h4><p className="muted">Start broad enough for the platform to learn, then test 2–4 distinct intent or interest clusters based on your real customer profile.</p></div>
                <div className="result"><h4>UTM template</h4><p className="muted">utm_source=meta&utm_medium=paid_social&utm_campaign={encodeURIComponent((product || "campaign").toLowerCase().replace(/[^a-z0-9]+/g,"-"))}&utm_content={{ad.name}}</p></div>
              </>}
            </div>
            <div className="actions"><button className="btn secondary">Save draft</button><button className="btn primary">Connect Meta later</button></div>
          </section>
        </section>
      </div>
      <footer className="footer">© 2026 CampaignPilot AI · Built for campaign planning, creative testing and measured growth.</footer>
    </main>
  );
}
