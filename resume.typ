#set page(
  paper: "us-letter",
  margin: (x: 0.55in, top: 0.48in, bottom: 0.48in),
)

#set text(
  font: ("Palatino Linotype", "Georgia", "Times New Roman"),
  size: 9.3pt,
  fill: rgb("#111827"),
  spacing: 103%,
  hyphenate: false,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.44em,
)

// Section header styling (Jake's Resume standard titlerule)
#let section(title) = {
  v(7pt)
  text(size: 11pt, weight: "bold", tracking: 0.04em)[#smallcaps(title)]
  v(-3.5pt)
  line(length: 100%, stroke: 0.6pt + rgb("#1f2937"))
  v(3pt)
}

// Subheading helper (Education, Honors, Certifications)
#let entry(title, date, subtitle, location) = {
  block(width: 100%, below: 4pt)[
    #grid(
      columns: (1fr, auto),
      [*#title*], [#text(size: 8.8pt)[#date]],
    )
    #if subtitle != "" or location != "" [
      #v(2pt)
      #grid(
        columns: (1fr, auto),
        [#emph(subtitle)], [#text(size: 8.8pt)[#emph(location)]],
      )
    ]
  ]
}

// Project heading helper
#let project-head(title, date) = {
  block(width: 100%, above: 5.5pt, below: 2pt)[
    #grid(
      columns: (1fr, auto),
      [*#title*], [#text(size: 8.8pt)[#date]],
    )
  ]
}

#let project-meta(stack, demo-url, gh-url) = {
  block(width: 100%, below: 2.5pt)[
    #grid(
      columns: (1fr, auto),
      [#text(size: 8.9pt)[#emph(stack)]],
      [#text(size: 8.5pt)[#link(demo-url)[#underline[Live Demo]] #h(3pt) $|$ #h(3pt) #link(gh-url)[#underline[GitHub]]]]
    )
  ]
}

// Bullet list helper
#let bullets(..items) = {
  v(0.5pt)
  list(
    marker: [•],
    spacing: 0.38em,
    ..items
  )
  v(1pt)
}

// -------------------------------------------------------------------------
// HEADER
// -------------------------------------------------------------------------
#align(center)[
  #text(size: 20pt, weight: "bold")[Premkumar M. Patel] \
  #v(4pt)
  #text(size: 8.4pt)[
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
  "2023 – 2027",
  "B.Tech in Computer Engineering, CGPA: 7.80 / 10.0",
  "Visnagar, Gujarat, India"
)
#bullets(
  [Coursework: Machine Learning, Artificial Intelligence, Deep Learning Applications, Database Management Systems, Operating Systems, Data Structures & Algorithms, Software Engineering, NLP, Compiler Design, GenAI],
  [Organizer in the college technical club, managing hackathons and technical workshops],
)

// -------------------------------------------------------------------------
// TECHNICAL SKILLS
// -------------------------------------------------------------------------
#section("Technical Skills")
#v(1pt)
#grid(
  columns: (1.52in, 1fr),
  row-gutter: 3pt,
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

#project-head("AgentPay", "Feb 2026")
#project-meta("Python, FastAPI, LangGraph, PostgreSQL, Redis, Next.js, Razorpay API", "https://buildathon-nu-eight.vercel.app/", "https://github.com/prempatel-ai/buildathon")
#bullets(
  [Built an autonomous buyer-agent system where the LLM proposes purchases and a separate deterministic policy engine gates every payment before it reaches the Razorpay API],
  [Logged every state change in an append-only audit trail backed by database triggers, with merchant data isolated per tenant and hard spend limits per consumer],
  [Set up a sandbox-to-production pipeline with webhook-driven agent integration, HMAC signature verification, and automatic retry with backoff],
)

#project-head("CampusCircle", "Nov 2025 – Jan 2026")
#project-meta("Next.js, FastAPI, PostgreSQL, LLaMA 3.3 70B, TypeScript", "https://campuscircle-pdqa.vercel.app/", "https://github.com/prempatel-ai/CampusCircle")
#bullets(
  [Designed and deployed the full backend and AI infrastructure for a verified student platform, scaling it solo to over 200 active campus users with average API response times under 150ms],
  [Shipped three production AI features on LLaMA 3.3 70B: an automated support agent ("Reva"), an adaptive quiz engine that adjusts question difficulty in real time, and a YouTube-to-study-notes summarizer],
  [Placed in the top 18 of over 500 participants nationwide in The Maverick Effect AI Challenge, run by the Dewang Mehta Foundation Trust],
)

#project-head("CliniqueAI", "Jan 2026 – Feb 2026")
#project-meta("Python, Flask, PostgreSQL, Scikit-learn, XGBoost, LangChain, Pydantic", "https://clinique-ai-ten.vercel.app/", "https://github.com/soham04010/CliniqueAI")
#bullets(
  [Trained and benchmarked Logistic Regression, Random Forest, and XGBoost classifiers for clinical diabetes risk prediction, tuning the decision boundary for explainability and high recall],
  [Built a RAG-based patient copilot grounded on localized EHR records, with transactional CRUD endpoints, Pydantic data schemas, and physician notification alerts],
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
  link("https://www.hackerrank.com/certificates/4c1e60a38138")[#underline[HackerRank Software Engineer Certification]],
  "2025",
  "Problem Solving, SQL, REST APIs",
  ""
)
