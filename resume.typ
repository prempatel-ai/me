#set page(
  paper: "us-letter",
  margin: (x: 0.45in, top: 0.42in, bottom: 0.42in),
)

#set text(
  font: ("Palatino Linotype", "Georgia", "Times New Roman"),
  size: 9.4pt,
  fill: rgb("#111827"),
  spacing: 105%,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.44em,
)

// Section header styling (matching Jake's Resume titlerule)
#let section(title) = {
  v(8.5pt)
  text(size: 11pt, weight: "bold", tracking: 0.03em)[#smallcaps(title)]
  v(-2.5pt)
  line(length: 100%, stroke: 0.55pt + rgb("#111827"))
  v(4pt)
}

// Subheading helper
#let entry(title, date, subtitle, location) = {
  block(width: 100%, below: 5.5pt)[
    #grid(
      columns: (1fr, auto),
      row-gutter: 3.5pt,
      [*#title*], [#text(size: 8.8pt)[#date]],
      [#text(size: 9.1pt)[#emph(subtitle)]], [#text(size: 8.8pt)[#emph(location)]],
    )
  ]
}

// Project heading helper
#let project(title, stack, date) = {
  block(width: 100%, above: 6.5pt, below: 3.5pt)[
    #grid(
      columns: (1fr, auto),
      [*#title* $|$ #text(size: 9.1pt)[#emph(stack)]], [#text(size: 8.8pt)[#date]],
    )
  ]
}

// Bullet list helper
#let bullets(..items) = {
  v(0.5pt)
  list(
    marker: [•],
    spacing: 0.42em,
    ..items
  )
}

// -------------------------------------------------------------------------
// HEADER
// -------------------------------------------------------------------------
#align(center)[
  #text(size: 19.5pt, weight: "bold")[Premkumar M. Patel] \
  #v(2.5pt)
  #text(size: 8.8pt)[
    +91 76229 46712 $|$
    #link("mailto:prempatel7740@gmail.com")[prempatel7740\@gmail.com] $|$
    #link("https://linkedin.com/in/prem-patel-ai")[linkedin.com/in/prem-patel-ai] $|$
    #link("https://github.com/prempatel-ai")[github.com/prempatel-ai] $|$
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
  "Bachelor of Technology in Computer Engineering (CGPA: 7.80 / 10.0)",
  "Visnagar, Gujarat, India"
)
#bullets(
  [*Relevant Coursework:* Data Structures & Algorithms, Machine Learning, Deep Learning, Database Management Systems (DBMS), Operating Systems, Software Engineering, Object-Oriented Programming, Computer Networks.],
)

// -------------------------------------------------------------------------
// TECHNICAL SKILLS
// -------------------------------------------------------------------------
#section("Technical Skills")
#v(1pt)
#grid(
  columns: (auto, 1fr),
  column-gutter: 10pt,
  row-gutter: 3.5pt,
  [*Languages & Backend:*], [Python (Core), C++, SQL, JavaScript, TypeScript, FastAPI, Flask, RESTful APIs, Pydantic],
  [*AI & Agent Systems:*], [LangGraph, LangChain, Autonomous Agents, Tool Calling, LLaMA 3.3 70B, OpenAI API, Groq, PyTorch],
  [*Retrieval & Databases:*], [RAG Pipelines, Self-RAG, FAISS, Qdrant, Pinecone, PostgreSQL, Redis, SQLite, MongoDB],
  [*Developer Tools & DevOps:*], [Docker, Git, GitHub, Vercel, Render, Postman, UptimeRobot, Linux/Bash],
)

// -------------------------------------------------------------------------
// FEATURED PROJECTS
// -------------------------------------------------------------------------
#section("Featured Projects")

#project("AgentPay", "Python, FastAPI, LangGraph, PostgreSQL, Redis, Next.js, Razorpay API", "Feb 2026")
#bullets(
  [Engineered autonomous buyer-agent infrastructure where the LLM proposes purchases, but an isolated *deterministic policy engine gates every payment action* before invoking Razorpay's API, eliminating unconstrained agent execution.],
  [Enforced an append-only, *database-trigger-backed audit trail* tracking every state transition, tenant merchant isolation, and hard consumer spend-authorization limits.],
  [Implemented a sandbox-to-production compliance pipeline with webhook-driven agent integration, *HMAC signature verification*, and automated retry backoff handling.],
)

#project("CampusCircle", "Next.js, FastAPI, PostgreSQL, LLaMA 3.3 70B, TypeScript", "Nov 2025 – Jan 2026")
#bullets(
  [Architected and deployed the full backend and AI infrastructure for a verified student platform, scaling solo to *200+ active campus users* with sub-150ms average API response times.],
  [Shipped 3 production AI features powered by *LLaMA 3.3 70B*: an automated support agent (_"Reva"_), an adaptive quiz engine dynamically tuning question difficulty, and a YouTube-to-structured-study notes summarizer.],
  [Awarded *Top 18 of 500+ participants* nationwide in The Maverick Ect AI Challenge (Dewang Mehta Foundation Trust).],
)

#project("CliniqueAI", "Python, Flask, PostgreSQL, Scikit-learn, XGBoost, LangChain, Pydantic", "Jan 2026 – Feb 2026")
#bullets(
  [Trained and benchmarked Logistic Regression, Random Forest, and *XGBoost classifiers* for clinical diabetes risk prediction, optimizing the decision boundary for medical explainability and high recall.],
  [Integrated a *RAG patient copilot* grounded on localized EHR records, transactional CRUD endpoints, Pydantic data schemas, and physician notification alerts.],
  [Eliminated cloud cold-start latency on Render free tier by configuring an automated heartbeat via UptimeRobot.],
)

#project("RAG Architectures Lab", "Python, LangChain, FAISS, Qdrant, Pinecone, FastAPI, Streamlit", "2025 – 2026")
#bullets(
  [Implemented a comparative playground for RAG paradigms, benchmarking naive dense retrieval vs. conversational memory vs. self-corrective agentic loops with automated query reformulation.],
  [Evaluated vector search indexing latency and precision tradeoffs across Qdrant, Pinecone, and in-memory FAISS.],
)

// -------------------------------------------------------------------------
// HONORS & CERTIFICATIONS
// -------------------------------------------------------------------------
#section("Honors & Certifications")
#entry(
  "National AI Hackathon (Unstop) — Top 20 Finalist (out of 1,600+)",
  "Feb 2026",
  "Selected among top 20 software teams nationwide for developing CliniqueAI diagnostic copilot",
  "National Level"
)
#entry(
  "The Maverick Ect AI Challenge — Top 18 Finalist (out of 500+)",
  "2026",
  "Recognized by Dewang Mehta Foundation Trust for building CampusCircle AI community platform",
  "National Level"
)
#entry(
  "HackerRank Certified Software Engineer",
  "2025",
  "Demonstrated competency in Problem Solving, SQL Database Queries, and RESTful API Architecture",
  "Verified Certificate"
)
