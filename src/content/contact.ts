import type { ContactContent } from "@/sections/contact/types";

export const contactContent: ContactContent = {
  id: "contact",
  label: "CONTACT",
  title: "Open to thoughtful conversations around AI systems and product engineering.",
  introduction:
    "Version 0.1 contact surface. This will stay simple: a few places to reach me and a resume link when the final document is ready.",
  links: [
    {
      id: "email",
      label: "Email",
      href: "mailto:sree.manas@example.com",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/SreeManas",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
    {
      id: "resume",
      label: "Resume",
      href: "/resume.pdf",
    },
  ],
  socialLinks: [],
};
