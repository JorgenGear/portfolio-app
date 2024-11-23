export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  category: 'data-viz' | 'web-dev'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard showing real-time analytics...",
    tags: ["Python", "D3.js", "React"],
    imageUrl: "/images/project1.jpg",
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://your-demo-url.com",
    category: "data-viz",
    featured: true
  },
  // Add more projects...
]

export const skills = {
  technical: [
    "Python",
    "JavaScript/TypeScript",
    "React",
    "Next.js",
    "SQL",
    "D3.js"
  ],
  dataAnalysis: [
    "Data Visualization",
    "Statistical Analysis",
    "Machine Learning",
    "Power BI",
    "Tableau"
  ],
  softSkills: [
    "Problem Solving",
    "Communication",
    "Project Management",
    "Team Leadership"
  ]
}

export const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername"
}