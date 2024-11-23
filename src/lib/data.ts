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
    title: "Crypto Market Regression Analysis",
    description: "Developed predictive models for cryptocurrency price movements using multiple regression analysis. Implemented feature engineering and model validation techniques to achieve 78% accuracy in price trend predictions.",
    tags: ["Python", "Pandas", "Scikit-learn", "Plotly", "Cryptocurrency API"],
    imageUrl: "/images/crypto-analysis.jpg",
    githubUrl: "https://github.com/yourusername/crypto-regression",
    category: "data-viz",
    featured: true
  },
  {
    id: 2,
    title: "AI Personal Database Assistant",
    description: "Created an AI-powered system for personal knowledge management. Features include semantic search, automatic categorization, and natural language querying of personal notes and documents.",
    tags: ["OpenAI API", "Python", "Vector DB", "React", "TypeScript"],
    imageUrl: "/images/ai-database.jpg",
    githubUrl: "https://github.com/yourusername/ai-database",
    category: "web-dev",
    featured: true
  },
  {
    id: 3,
    title: "Voter Behavior Analysis",
    description: "Statistical analysis of voting patterns using demographic data. Built interactive visualizations to explore correlations between socioeconomic factors and voting behavior.",
    tags: ["R", "D3.js", "Statistical Analysis", "GIS"],
    imageUrl: "/images/voter-analysis.jpg",
    githubUrl: "https://github.com/yourusername/voter-analysis",
    category: "data-viz"
  },
  {
    id: 4,
    title: "Algorithmic Trading Platform",
    description: "Developed an automated trading system for stocks using technical analysis indicators. Includes backtesting capabilities and real-time market data integration.",
    tags: ["Python", "pandas-ta", "FastAPI", "WebSocket"],
    imageUrl: "/images/algo-trading.jpg",
    githubUrl: "https://github.com/yourusername/algo-trading",
    category: "data-viz"
  },
  {
    id: 5,
    title: "Crypto Arbitrage Scanner",
    description: "Real-time cryptocurrency arbitrage detection system across multiple exchanges. Identifies price discrepancies and potential profitable trading opportunities.",
    tags: ["Node.js", "WebSocket", "MongoDB", "Trading APIs"],
    imageUrl: "/images/crypto-arbitrage.jpg",
    githubUrl: "https://github.com/yourusername/crypto-arbitrage",
    category: "web-dev"
  }
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