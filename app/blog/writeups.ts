export type WriteUpSection = {
  title: string;
  summary: string;
  commands?: { label?: string; snippet: string }[];
  findings?: string[];
  loot?: string[];
  takeaways?: string[];
};

export type WriteUp = {
  slug: string;
  title: string;
  target: string;
  type: "Machine" | "Challenge";
  difficulty: "Easy" | "Medium" | "Hard" | "Insane" | string;
  os?: string;
  status: "Rooted" | "In progress" | "Draft";
  release?: string;
  timeToRoot?: string;
  cover?: string;
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  skills: string[];
  tags: string[];
  summary: string;
  highlights: string[];
  sections: WriteUpSection[];
  loot?: string[];
  external?: { label: string; href: string }[];
  notes?: string;
};

export const writeups: WriteUp[] = [
];

export const writeupTemplate: WriteUp = {
  slug: "htb-machine-slug",
  title: "Descriptive title",
  target: "Hack The Box: Machine name",
  type: "Machine",
  difficulty: "Easy",
  os: "Linux",
  status: "Draft",
  release: new Date().toISOString().slice(0, 10),
  timeToRoot: "",
  cover: "/blog/cover.png",
  gallery: ["/blog/screenshot1.png"],
  skills: ["enum", "exploit"],
  tags: ["tag1", "tag2"],
  summary: "One-liner of the path to root.",
  highlights: ["Key thing 1", "Key thing 2"],
  sections: [
    {
      title: "Recon",
      summary: "What you saw and why it matters.",
      commands: [{ label: "Scan", snippet: "nmap -sC -sV -oN scans/name.nmap <ip>" }],
      findings: ["service detail"],
    },
  ],
  loot: ["user flag", "root flag"],
  external: [{ label: "HTB link", href: "https://app.hackthebox.com" }],
};
