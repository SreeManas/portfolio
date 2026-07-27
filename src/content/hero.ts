export const heroContent = {
  identity: "K. Sree Manas",
  navLabel: "Primary",
  navigation: [
    {
      label: "Work",
      href: "#work",
    },
    {
      label: "Notes",
      href: "/notes",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Journey",
      href: "/journey",
    },
    {
      label: "About",
      href: "#about",
    },
  ],
  shortcutLabel: "Open command center",
  shortcutKey: "K",
  shortcutSeparator: "+",
  eyebrow: "CURRENT MISSION",
  title: "I build AI systems that help people make better decisions.",
  introduction:
    "I am an undergraduate engineer focused on AI systems that support human judgment. I care about explainability, system design, and products that make complex decisions easier to inspect. This site documents my work, research, and engineering journey.",
  sidebarLabel: "CURRENTLY",
  sidebarItems: [
    {
      label: "Location",
      value: ["Hyderabad, India"],
    },
    {
      label: "Education",
      value: ["B.Tech Information Technology"],
    },
    {
      label: "Current Focus",
      value: ["Decision Intelligence", "Medical AI", "Agentic Systems"],
    },
    {
      label: "Building",
      value: ["MEDROUTER"],
    },
    {
      label: "Researching",
      value: ["LLMs", "Evaluation", "Routing Systems"],
    },
  ],
  notesStrip: {
    label: "Latest Engineering Notes",
    title: "Small records from the workbench.",
    notes: [
      {
        date: "Log 01",
        title: "Decision traces",
        body:
          "Testing how much reasoning should stay visible before an interface starts to feel noisy.",
      },
      {
        date: "Log 02",
        title: "Evaluation habits",
        body:
          "Collecting cases where a correct output still fails because the explanation is too thin.",
      },
      {
        date: "Log 03",
        title: "Routing models",
        body:
          "Comparing distance-first choices against capability-first choices under time pressure.",
      },
    ],
  },
} as const;
