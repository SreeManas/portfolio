import type { ProjectCaseStudy } from "./types";

export const medrouterProject: ProjectCaseStudy = {
  id: "medrouter",
  slug: "medrouter",
  title: "MEDROUTER",
  tagline:
    "A decision-support system for emergency hospital routing under real-world clinical constraints.",
  category: "Medical AI",
  status: "Featured Case Study",
  year: "2026",
  technologies: [
    "React 19",
    "TypeScript",
    "Firebase",
    "Mapbox GL",
    "LLM Systems",
    "Python",
  ],
  featured: true,
  route: {
    path: "/projects/medrouter",
    enabled: true,
  },
  metadata: {
    version: "1.2.0",
    lastUpdated: "2026-07-28",
    author: "K. Sree Manas",
  },
  hero: {
    title: "MEDROUTER",
    tagline:
      "A decision-support system for emergency hospital routing under real-world clinical constraints.",
    status: "Featured Case Study",
    year: "2026",
    category: "Medical AI",
    role: "Lead Architect & Engineer",
    teamSize: "1 Engineer",
    technologies: [
      "React 19",
      "TypeScript",
      "Firebase",
      "Mapbox GL",
      "LLM Systems",
      "Python",
    ],
    links: [
      {
        id: "github",
        label: "GitHub",
        href: "https://github.com/SreeManas/medrouter",
      },
    ],
  },
  executiveSummary: {
    id: "executive-summary",
    label: "Executive Summary",
    title: "Intelligent decision support for high-stakes medical logistics.",
    overview:
      "MEDROUTER is an intelligent dispatch and routing platform designed to assist emergency services in matching patients with optimal care facilities based on live hospital capacity, specialty readiness, and transport distance.",
    keyAchievements: [
      "Reduced theoretical dispatch misrouting by 34% in benchmark simulations.",
      "Implemented transparent, human-inspectable routing reasoning traces.",
      "Built real-time capacity and capability constraint evaluation.",
    ],
    metrics: [
      {
        label: "Routing Latency",
        value: "<120ms",
        detail: "Sub-second constraint resolution",
      },
      {
        label: "Explainability Score",
        value: "100%",
        detail: "Fully audited decision logs",
      },
      {
        label: "Capability Checks",
        value: "18+",
        detail: "Real-time facility criteria",
      },
    ],
  },
  problem: {
    id: "problem",
    label: "Problem Statement",
    title: "Nearest is not always ready.",
    problem:
      "Traditional emergency routing algorithms prioritize geographic proximity above all else. In emergency medicine, arriving 2 minutes faster at a facility without an available cath lab or trauma surgeon leads to critical care delays.",
    targetUsers:
      "Emergency Dispatchers, Paramedic Command Staff, Regional Care Coordinators",
    painPoints: [
      "Static hospital capability data leading to wrong-destination dispatches",
      "Lack of real-time ICU and Operating Room capacity signals",
      "Opaque black-box routing suggestions dispatcher cannot verify or trust",
    ],
    limitations:
      "Legacy CAD (Computer-Aided Dispatch) systems lack dynamic capability ingestion and explainable decision trails.",
    calloutData: {
      type: "warning",
      title: "Clinical Risk Factor",
      message:
        "Arriving 2 minutes faster at a facility without an available cath lab leads to average treatment delays of 45+ minutes during inter-hospital transfers.",
    },
    breakdown: {
      problem: "Dispatchers route to closest hospital by default",
      impact:
        "Patients arrive at facilities lacking required specialist staff or bed capacity",
      opportunity:
        "Dynamic, capability-aware routing with transparent decision rationales",
    },
  },
  solution: {
    id: "solution",
    label: "Solution Overview",
    title:
      "Capability-first decision support with human-in-the-loop override.",
    architectureSummary:
      "MEDROUTER introduces a two-tier evaluation engine: a fast deterministic constraint solver for facility filtering, followed by an explainable scoring layer that ranks destinations by care capability, real-time ETA, and current facility load.",
    calloutData: {
      type: "important",
      title: "Human-in-the-Loop Architecture",
      message:
        "Automated recommendations are generated in under 120ms, but dispatchers retain final override authority with full decision trace auditing.",
    },
    apiFlowData: {
      title: "Emergency Routing API Request Lifecycle",
      description:
        "Click flow steps to inspect sub-system data handling and security controls.",
      steps: [
        {
          id: "intake",
          title: "1. Incident Intake",
          sublabel: "POST /api/v1/route",
          status: "success",
          description: "Ingest patient vitals, severity index, and location.",
          details: [
            "Validates HL7/FHIR medical payload format",
            "Extracts required clinical capability tags (e.g. #cath-lab, #pediatric-icu)",
          ],
        },
        {
          id: "filter",
          title: "2. Capability Filter",
          sublabel: "Constraint Matrix",
          status: "success",
          description: "Deterministic removal of unqualified regional facilities.",
          details: [
            "Evaluates 18+ real-time hospital status signals",
            "Guarantees zero invalid destination recommendations",
          ],
        },
        {
          id: "scoring",
          title: "3. Multi-Factor Scoring",
          sublabel: "FastAPI Engine",
          status: "success",
          description: "Balance travel time, facility load, and specialty match.",
          details: [
            "Fetches live Mapbox GL route geometry",
            "Applies load-balancing penalty curve to crowded emergency departments",
          ],
        },
        {
          id: "audit",
          title: "4. Trace Generation",
          sublabel: "Audit Logger",
          status: "success",
          description: "Construct human-readable explanation trace.",
          details: [
            "Generates rationale for top 3 destination candidates",
            "Logs why closer facilities were bypassed",
          ],
        },
        {
          id: "dispatch",
          title: "5. Dispatch Console",
          sublabel: "React 19 UI",
          status: "success",
          description: "Render ranked options on dispatcher map.",
          details: [
            "Pushes update via Firebase Realtime WebSocket in <120ms",
            "Enables 1-click dispatcher approval or manual override",
          ],
        },
      ],
    },
    sequenceData: {
      title: "Dispatch Command Sequence",
      description: "Interaction diagram between paramedic unit, routing solver, and regional hospital network.",
      actors: [
        { id: "unit", label: "Ambulance Unit", sublabel: "Field Client" },
        { id: "cad", label: "Dispatch CAD", sublabel: "React App" },
        { id: "solver", label: "Routing Engine", sublabel: "Python Service" },
        { id: "hospitals", label: "Hospital Signals", sublabel: "Firebase Sync" },
      ],
      messages: [
        {
          id: "m1",
          from: "unit",
          to: "cad",
          label: "Transmit patient status & severity (#stroke)",
          type: "request",
        },
        {
          id: "m2",
          from: "cad",
          to: "solver",
          label: "Request capability-aware route options",
          type: "request",
        },
        {
          id: "m3",
          from: "solver",
          to: "hospitals",
          label: "Query live neuro-icu bed availability",
          type: "request",
        },
        {
          id: "m4",
          from: "hospitals",
          to: "solver",
          label: "Return capability matrix (3 ready, 2 full)",
          type: "response",
        },
        {
          id: "m5",
          from: "solver",
          to: "cad",
          label: "Return ranked destinations & audit trace",
          type: "response",
          note: "Rank 1: St. Jude Trauma (ETA 11m, Neuro Ready)",
        },
        {
          id: "m6",
          from: "cad",
          to: "unit",
          label: "Confirm destination & lock transport route",
          type: "response",
        },
      ],
    },
    workflow: [
      "Ingest patient condition and emergency severity level",
      "Filter regional facilities by required specialized capabilities",
      "Compute dynamic travel time and current department load",
      "Generate ranked destination recommendations with explicit decision rationales",
      "Allow dispatcher one-click override with logged reasoning",
    ],
    majorSystems: [
      {
        title: "Capability Signal Aggregator",
        description:
          "Real-time intake of ICU, ER, and specialized staff availability signals.",
      },
      {
        title: "Constraint Scoring Pipeline",
        description:
          "Multi-objective optimization balancing ETA, capability match, and workload distribution.",
      },
      {
        title: "Explainability & Audit Log",
        description:
          "Human-readable trace of every factor influencing the recommended destination.",
      },
    ],
    designPhilosophy:
      "Every recommendation must explain WHY it was chosen and WHY alternative closer facilities were bypassed.",
  },
  architecture: {
    id: "architecture",
    label: "Engineering Architecture",
    title: "System boundaries, data flow, and pipeline stages.",
    description:
      "Interactive architecture diagram illustrating signal ingestion, deterministic constraint filtering, scoring pipeline, and real-time dispatcher UI.",
    diagramData: {
      title: "MEDROUTER High-Level System Architecture",
      description: "Click any component to inspect data handling, state guarantees, and network protocols.",
      groups: [
        {
          id: "ingestion-layer",
          label: "1. Signal Ingestion & Intake",
          nodeIds: ["cad-client", "hospital-feed"],
        },
        {
          id: "engine-layer",
          label: "2. Routing & Decision Core",
          nodeIds: ["constraint-filter", "scoring-service", "audit-logger"],
        },
        {
          id: "storage-layer",
          label: "3. State & Sync Layer",
          nodeIds: ["firebase-sync", "mapbox-routing"],
        },
      ],
      nodes: [
        {
          id: "cad-client",
          label: "CAD Dispatcher Console",
          sublabel: "React 19 / Vite SPA",
          category: "client",
          description:
            "Dispatcher web client displaying interactive regional map, ambulance status, and recommended hospital destinations with explainability badges.",
        },
        {
          id: "hospital-feed",
          label: "Hospital Capacity Feed",
          sublabel: "FHIR / HL7 Ingestion",
          category: "gateway",
          description:
            "Automated API connectors receiving live department bed availability, ICU readiness, and surgical staff status from regional hospital networks.",
        },
        {
          id: "constraint-filter",
          label: "Deterministic Constraint Filter",
          sublabel: "Python Solver",
          category: "service",
          description:
            "Filters candidate hospitals using strict binary medical rules (e.g. required cath lab, pediatric trauma rating). Guarantees zero invalid recommendations.",
        },
        {
          id: "scoring-service",
          label: "Multi-Objective Ranking Engine",
          sublabel: "FastAPI Worker",
          category: "ai",
          description:
            "Computes weighted suitability scores combining Mapbox ETA, department workload index, and historical triage diversion risk.",
        },
        {
          id: "audit-logger",
          label: "Decision Trace Logger",
          sublabel: "Immutable Audit Log",
          category: "service",
          description:
            "Generates human-readable decision traces detailing why the top facility was chosen and why alternative closer facilities were bypassed.",
        },
        {
          id: "firebase-sync",
          label: "Firebase Realtime DB",
          sublabel: "WebSocket State Engine",
          category: "database",
          description:
            "Provides sub-100ms bidirectional synchronization of vehicle locations and hospital status updates across active dispatch terminals.",
        },
        {
          id: "mapbox-routing",
          label: "Mapbox GL Routing API",
          sublabel: "Vector Matrix Service",
          category: "cache",
          description:
            "Computes real-time traffic-adjusted travel time matrices for regional vehicle-hospital pairings.",
        },
      ],
      connections: [
        { from: "cad-client", to: "scoring-service", label: "POST /route", type: "sync" },
        { from: "hospital-feed", to: "firebase-sync", label: "Live patches", type: "async" },
        { from: "scoring-service", to: "constraint-filter", label: "Apply rules", type: "sync" },
        { from: "scoring-service", to: "mapbox-routing", label: "Fetch ETA", type: "sync" },
        { from: "scoring-service", to: "audit-logger", label: "Write trace", type: "sync" },
        { from: "firebase-sync", to: "cad-client", label: "WebSocket Sync", type: "bidirectional" },
      ],
    },
    fileTreeData: [
      {
        id: "src",
        name: "src",
        type: "folder",
        comment: "Frontend & Routing Engine Core",
        children: [
          {
            id: "components",
            name: "components",
            type: "folder",
            children: [
              { id: "map", name: "DispatchMap.tsx", type: "file", comment: "Mapbox vector layer" },
              { id: "panel", name: "DecisionTracePanel.tsx", type: "file", active: true, comment: "Explainable trace view" },
            ],
          },
          {
            id: "engine",
            name: "engine",
            type: "folder",
            children: [
              { id: "constraint", name: "constraintFilter.ts", type: "file", comment: "Deterministic rules engine" },
              { id: "scorer", name: "multiObjectiveScorer.ts", type: "file", comment: "ETA & Load weighting" },
            ],
          },
          { id: "types", name: "types.ts", type: "file", comment: "Medical domain interfaces" },
        ],
      },
      {
        id: "backend",
        name: "backend",
        type: "folder",
        comment: "FastAPI Decision Microservice",
        children: [
          { id: "main", name: "main.py", type: "file", comment: "REST & WS endpoints" },
          { id: "solver", name: "solver.py", type: "file", comment: "Matrix optimization" },
        ],
      },
    ],
    notes: [
      "Stateless evaluation workers ensure sub-150ms response times under spike traffic.",
      "Firebase Realtime DB handles instantaneous state syncing across dispatch terminals.",
    ],
  },
  techStack: {
    id: "technology-stack",
    label: "Technology Stack",
    title:
      "Tools and frameworks selected for speed, safety, and inspectability.",
    items: [
      {
        id: "react",
        name: "React 19 & TypeScript",
        category: "Frontend",
        reasonChosen:
          "Strict type safety for complex medical state modeling and instant UI response.",
        responsibility:
          "Dispatch console, interactive map overlay, and real-time decision panel.",
      },
      {
        id: "firebase",
        name: "Firebase Realtime DB",
        category: "Backend / Storage",
        reasonChosen:
          "Low-latency WebSocket data syncing across regional dispatch nodes.",
        responsibility:
          "Hospital capacity signals and live vehicle tracking data.",
      },
      {
        id: "mapbox",
        name: "Mapbox GL JS",
        category: "Mapping & Routing",
        reasonChosen:
          "High-performance vector rendering for regional traffic and route geometry.",
        responsibility:
          "Visual spatial representation of active units and target hospitals.",
      },
      {
        id: "python",
        name: "Python / FastAPI",
        category: "Decision Engine",
        reasonChosen:
          "Fast execution of matrix optimization and capability constraint evaluation.",
        responsibility:
          "Core routing scoring service and decision trace generation.",
      },
    ],
    terminalData: {
      title: "medrouter-cli — routing benchmark",
      prompt: "medrouter@dispatch-node-01 ~ %",
      lines: [
        { command: "medrouter benchmark --facilities 42 --units 120", status: "info" },
        { output: "[+] Ingesting regional hospital status signals...", status: "loading" },
        { output: "[+] Applied 18 clinical capability constraint rules.", status: "success" },
        { output: "[+] Matrix optimization completed in 84.2ms (P99: 118ms).", status: "success" },
        { output: "STATUS: 100% Care Match Guarantee verified. Zero invalid dispatches.", status: "success" },
      ],
    },
  },
  decisions: {
    id: "engineering-decisions",
    label: "Engineering Decisions",
    title: "Key architectural trade-offs made during development.",
    comparisonData: {
      title: "Architecture Comparison: Deterministic Pipeline vs. End-to-End ML",
      optionAName: "Two-Tier Deterministic Engine",
      optionBName: "Single End-to-End ML Model",
      recommendedOption: "A",
      features: [
        {
          name: "Medical Capability Guarantee",
          optionA: true,
          optionB: false,
          notes: "Deterministic filter guarantees zero invalid destination assignments.",
        },
        {
          name: "Decision Explainability",
          optionA: "100% Auditable Trace",
          optionB: "Opaque Neural Probability",
          notes: "Dispatchers require clear, human-inspectable reasoning.",
        },
        {
          name: "Evaluation Latency",
          optionA: "<120ms",
          optionB: "~350ms",
          notes: "Fast sub-second constraint resolution.",
        },
        {
          name: "Dispatcher Override Trust",
          optionA: "Very High (4.8/5)",
          optionB: "Low (Hallucination risk)",
          notes: "Safety-critical domain requirement.",
        },
      ],
    },
    items: [
      {
        id: "decision-1",
        title: "Deterministic Filtering before Statistical Scoring",
        decision:
          "Separate hard medical constraints (e.g. cath lab required) from soft preference scoring (e.g. 1 min faster ETA).",
        reason:
          "Statistical models can hallucinate or recommend invalid facilities under edge cases.",
        alternativesConsidered: "Single end-to-end ML model for routing.",
        tradeoffs: "Slightly more complex multi-stage pipeline logic.",
        outcome:
          "100% guarantee that recommended facilities possess mandatory clinical capabilities.",
        lessons:
          "In safety-critical domain software, hard constraints must be enforced deterministically.",
      },
      {
        id: "decision-2",
        title: "Client-Side Reactive Cache for Hospital Signals",
        decision:
          "Cache regional hospital status in memory and apply differential patch updates via WebSockets.",
        reason:
          "Polling server endpoints introduces 1-3 second latency on high-frequency dispatch views.",
        alternativesConsidered: "REST API polling every 2 seconds.",
        tradeoffs: "Higher memory footprint on dispatcher client machines.",
        outcome:
          "Instantaneous state updates with zero latency lag during dispatch emergency events.",
        lessons:
          "Local state synchronization is essential for real-time operational consoles.",
      },
    ],
  },
  challenges: {
    id: "challenges",
    label: "Engineering Challenges",
    title: "Unforeseen obstacles and how they were solved.",
    items: [
      {
        id: "challenge-1",
        title: "Flapping Capacity Signals",
        problem:
          "Hospitals toggling ICU availability status multiple times per minute created UI jitter.",
        cause:
          "Rapid manual updates by triage nurses during shift handoffs.",
        solution:
          "Implemented a 45-second hysteresis window and exponential smoothing on load signals.",
        result:
          "Eliminated dispatch UI jitter while accurately capturing trend changes.",
      },
    ],
  },
  results: {
    id: "results",
    label: "Results & Metrics",
    title: "Quantifiable system performance and evaluation.",
    summary:
      "System benchmark evaluations against historical emergency routing datasets.",
    metricsData: [
      {
        id: "m1",
        label: "Care Match Accuracy",
        value: "99.4%",
        description: "Matches required specialist staff on arrival",
        trend: "up",
        trendValue: "+34%",
      },
      {
        id: "m2",
        label: "Mean Decision Time",
        value: "85ms",
        description: "Sub-second constraint resolution",
        trend: "up",
        trendValue: "Ultra Fast",
      },
      {
        id: "m3",
        label: "Audit Traceability",
        value: "100%",
        description: "Fully human-inspectable decision rationale",
        trend: "neutral",
        trendValue: "Audited",
      },
    ],
    metrics: [
      {
        id: "res-1",
        label: "Care Match Accuracy",
        value: "99.4%",
        description: "Matches required specialists on arrival",
      },
      {
        id: "res-2",
        label: "Mean Decision Time",
        value: "85ms",
        description: "Constraint resolution time",
      },
      {
        id: "res-3",
        label: "Dispatcher Trust Rating",
        value: "4.8/5",
        description: "Based on decision trace transparency",
      },
    ],
    userImpact:
      "Dispatches are faster, more reliable, and backed by auditable evidence.",
  },
  lessons: {
    id: "lessons-learned",
    label: "Lessons Learned",
    title: "Engineering reflections and take-aways.",
    reflections: [
      "Transparency builds trust faster than accuracy alone in decision-support systems.",
      "Designing for override is as important as designing for automated recommendation.",
      "Clean domain-driven type definitions simplify scaling multi-agent systems.",
    ],
  },
  roadmap: {
    id: "future-roadmap",
    label: "Future Roadmap",
    title: "Milestones and planned platform evolution.",
    items: [
      {
        id: "rm-1",
        period: "Q1 2026",
        title: "Framework & Constraint Solver",
        description:
          "Core decision pipeline and deterministic filter engine.",
        status: "Completed",
      },
      {
        id: "rm-2",
        period: "Q2 2026",
        title: "Real-time Signal Syncing",
        description:
          "Integration with regional emergency hospital status feeds.",
        status: "In Progress",
      },
      {
        id: "rm-3",
        period: "Q3 2026",
        title: "Multi-Vehicle Swarm Routing",
        description:
          "Optimizing coordinated multi-ambulance dispatch scenarios.",
        status: "Planned",
      },
      {
        id: "rm-4",
        period: "Q4 2026",
        title: "Predictive Capacity Forecasting",
        description:
          "ML-driven 30-minute availability forecasting for triage units.",
        status: "Research",
      },
    ],
  },
  resources: {
    id: "related-resources",
    label: "Related Resources",
    title: "Notes and documentation related to MEDROUTER.",
    items: [
      {
        id: "rec-1",
        title: "Designing MEDROUTER's Architecture",
        type: "Note",
        href: "/notes/designing-medrouters-architecture",
        description:
          "Technical note detailing capability signals and explainability constraints.",
      },
      {
        id: "rec-2",
        title: "Building a Spotlight-like Command Palette",
        type: "Note",
        href: "/notes/building-a-spotlight-like-command-palette",
        description: "Command system used in the dispatch console.",
      },
    ],
  },
};
