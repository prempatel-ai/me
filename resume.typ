#set page(
  paper: "us-letter",
  margin: (x: 0.50in, top: 0.44in, bottom: 0.44in),
)

#set text(
  font: ("Palatino Linotype", "Georgia", "Times New Roman"),
  size: 9.4pt,
  fill: rgb("#111827"),
  spacing: 104%,
  hyphenate: false,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.46em,
)

// Section header styling (Jake's Resume standard titlerule)
#let section(title) = {
  v(8pt)
  text(size: 11pt, weight: "bold", tracking: 0.04em)[#smallcaps(title)]
  v(-3.5pt)
  line(length: 100%, stroke: 0.6pt + rgb("#1f2937"))
  v(4pt)
}

// Subheading helper (Education, Honors, Certifications)
#let entry(title, date, subtitle, location) = {
  block(width: 100%, below: 5pt)[
    #grid(
      columns: (1fr, auto),
      [*#title*], [#text(size: 9pt)[#date]],
    )
    #if subtitle != "" or location != "" [
      #v(2.5pt)
      #grid(
        columns: (1fr, auto),
        [#emph(subtitle)], [#text(size: 9pt)[#emph(location)]],
      )
    ]
  ]
}

// Project heading helper
#let project(title, stack, date) = {
  block(width: 100%, above: 6.5pt, below: 3pt)[
    #grid(
      columns: (1fr, auto),
      [*#title* $|$ #text(size: 9pt)[#emph(stack)]], [#text(size: 9pt)[#date]],
    )
  ]
}

// Bullet list helper
#let bullets(..items) = {
  v(1pt)
  list(
    marker: [•],
    spacing: 0.44em,
    ..items
  )
  v(1.5pt)
}

// -------------------------------------------------------------------------
// HEADER
// -------------------------------------------------------------------------
#align(center)[
  #text(size: 20pt, weight: "bold")[Premkumar M. Patel] \
  #v(3.5pt)
  #text(size: 8.5pt)[
    +91 76229 46712 #h(4pt) $|$ #h(4pt)
    #link("mailto:prempatel7740@gmail.com")[prempatel7740\@gmail.com] #h(4pt) $|$ #h(4pt)
    #link("https://linkedin.com/in/prem-patel-ai")[linkedin.com/in/prem-patel-ai] #h(4pt) $|$ #h(4pt)
    #link("https://github.com/prempatel-ai")[github.com/prempatel-ai] #h(4pt) $|$ #h(4pt)
    #link("https://medium.com/@prempatel7740")[medium.com/\@prempatel7740]
  ]
]

#v(1pt)

// -------------------------------------------------------------------------
// EDUCATION
// -------------------------------------------------------------------------
#section("Education")
#entry(
  "Sankalchand Patel University",
  "June 2023 – June 2027",
  "Bachelor of Technology in Computer Engineering, CGPA: 7.80 / 10.0",
  "Visnagar, Gujarat, India"
)
#bullets(
  [*Coursework:* Data Structures and Algorithms, DBMS, Operating Systems, OOP, Computer Networks, Software Engineering, Machine Learning, Deep Learning],
)

// -------------------------------------------------------------------------
// TECHNICAL SKILLS
// -------------------------------------------------------------------------
#section("Technical Skills")
#v(1pt)
#grid(
  columns: (1.52in, 1fr),
  row-gutter: 3.5pt,
  [*Languages:*], [Python, C++, SQL, JavaScript, TypeScript],
  [*Backend & APIs:*], [FastAPI, Flask, RESTful APIs, Pydantic, Webhooks, HMAC Verification],
  [*AI & Agent Systems:*], [LangGraph, LangChain, Autonomous Agents, Tool Calling, LLaMA 3.3 70B, OpenAI API, Groq],
  [*Databases & Retrieval:*], [PostgreSQL, Redis, SQLite, RAG Pipelines, FAISS, Qdrant, Pinecone],
  [*DevOps & Tools:*], [Docker, Git, GitHub, Linux/Bash, Vercel, Render, Postman, UptimeRobot],
)

// -------------------------------------------------------------------------
// FEATURED PROJECTS
// -------------------------------------------------------------------------
#section("Featured Projects")

#project("AgentPay", "Python, FastAPI, LangGraph, PostgreSQL, Redis, Next.js, Razorpay API", "Feb 2026")
#bullets(
  [Built an autonomous buyer-agent system where the LLM proposes purchases, but a separate *deterministic policy engine checks and gates every payment* before it reaches the Razorpay API, so the agent can never execute a payment on its own],
  [Added an append-only *audit trail backed by database triggers* to log every state change, kept merchant data isolated per tenant, and enforced hard spend limits per consumer],
  [Built a sandbox-to-production pipeline with webhook-driven agent integration, *HMAC signature verification*, and automatic retry with backoff],
)

#project("CampusCircle", "Next.js, FastAPI, PostgreSQL, LLaMA 3.3 70B, TypeScript", "Nov 2025 – Jan 2026")
#bullets(
  [Designed and deployed the full backend and AI infrastructure for a verified student platform, scaling it solo to *over 200 active campus users* with average API response times under 150ms],
  [Shipped three production AI features powered by *LLaMA 3.3 70B*: an automated support agent (_"Reva"_), an adaptive quiz engine that adjusts question difficulty in real time, and a YouTube-to-study-notes summarizer],
  [Placed in the *top 18 of over 500 participants* nationwide in The Maverick Effect AI Challenge, run by the Dewang Mehta Foundation Trust],
)

#project("CliniqueAI", "Python, Flask, PostgreSQL, Scikit-learn, XGBoost, LangChain, Pydantic", "Jan 2026 – Feb 2026")
#bullets(
  [Trained and benchmarked Logistic Regression, Random Forest, and *XGBoost classifiers* for clinical diabetes risk prediction, tuning the decision boundary for medical explainability and high recall],
  [Built a *RAG-based patient copilot* grounded on localized EHR records, with transactional CRUD endpoints, Pydantic data schemas, and physician notification alerts],
  [Removed cold-start latency on Render's free tier by setting up an automated heartbeat with UptimeRobot],
)

// -------------------------------------------------------------------------
// HONORS
// -------------------------------------------------------------------------
#section("Honors")
#entry(
  "National AI Hackathon (Unstop) — Top 20 Finalist, out of 1,600+ teams",
  "Feb 2026",
  "Selected among the top 20 software teams nationwide for CliniqueAI, a diagnostic copilot",
  "National Level"
)
#entry(
  "The Maverick Effect AI Challenge — Top 18 Finalist, out of 500+ participants",
  "2026",
  "Recognized by the Dewang Mehta Foundation Trust for CampusCircle, an AI community platform",
  "National Level"
)

// -------------------------------------------------------------------------
// CERTIFICATIONS
// -------------------------------------------------------------------------
#section("Certifications")
#entry(
  "HackerRank Software Engineer Certification",
  "2025",
  "Problem Solving, SQL, REST APIs",
  ""
)
