export interface Project {
  id: number
  title: string
  description: string
  longDescription?: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  category: 'data-viz' | 'web-dev'
  featured?: boolean
  technicalDetails?: {
    title: string
    description: string
  }[]
  codeSnippets?: {
    title: string
    code: string
    language: string
  }[]
  challenges?: {
    title: string
    description: string
    solution: string
  }[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Crypto Disequilibrium Detector",
    description: "An automated system that detects and exploits price discrepancies across cryptocurrency trading pairs using graph theory and real-time market data.",
    longDescription: `This project implements a sophisticated cryptocurrency arbitrage detection system that uses graph theory to identify price discrepancies across different trading pairs. The system constructs a directed weighted graph where nodes represent cryptocurrencies and edges represent exchange rates. It then analyzes all possible trading paths to identify profitable arbitrage opportunities.

The system integrates with the Alpaca trading API for executing trades and uses the CoinGecko API for real-time price data. It employs NetworkX for graph operations and implements various algorithms to detect profitable trading cycles.`,
    tags: ["Python", "NetworkX", "Alpaca API", "Graph Theory", "Cryptocurrency", "Algorithmic Trading"],
    imageUrl: "/images/crypto.png",
    githubUrl: "https://github.com/yourusername/crypto-disequilibrium",
    category: "data-viz",
    featured: true,
    technicalDetails: [
      {
        title: "Graph Theory Implementation",
        description: "Utilizes NetworkX to create a directed weighted graph where nodes represent cryptocurrencies and edges represent exchange rates. Implements path finding algorithms to detect arbitrage opportunities."
      },
      {
        title: "Real-time Data Integration",
        description: "Integrates with CoinGecko API for real-time cryptocurrency price data and Alpaca API for trade execution. Implements rate limiting and error handling for reliable data collection."
      },
      {
        title: "Arbitrage Detection",
        description: "Analyzes all possible trading paths using permutations and calculates the cumulative exchange rates to identify profitable trading opportunities when the product of rates exceeds 1.001."
      },
      {
        title: "Automated Trading",
        description: "Implements automated trading functionality through Alpaca's API, with proper error handling and trade execution timing to ensure successful arbitrage execution."
      }
    ],
    codeSnippets: [
      {
        title: "Graph Construction and Data Collection",
        language: "python",
        code: `def data_grab():
    for coin1, coin2 in permutations(coins, 2):
        current_time = datetime.now()
        current_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
        filename = file_path + coin1[0] + "_to_" + coin2[0] + ".csv"
        with open(filename, "w") as f:
            writer = csv.writer(f)
            url = url1 + coin1[0] + url2n4 + coin2[0] + url3 + coin1[1] + url2n4 + coin2[1]
            req = requests.get(url)
            rdict = json.loads(req.text)
            try:
                exchange_rate = rdict[coin1[0]][coin2[1]]
                writer.writerow([coin1[0], coin2[0], exchange_rate, current_time])
            except:
                pass
        time.sleep(4)

def data_to_graph():
    for coin1, coin2 in permutations(coins,2):
        with open(file_path + coin1[0] + "_to_" + coin2[0] + ".csv", "r") as fil:
            reader = csv.reader(fil)
            for row in reader:
                try:
                    currency_from, currency_to, weight, _ = row
                    weight1 = float(weight)
                    g.add_weighted_edges_from([(coin1[1], coin2[1], weight1)])
                except:
                    pass`
      },
      {
        title: "Arbitrage Detection Algorithm",
        language: "python",
        code: `def find_disequilibrium():
    results = {}
    for coin1, coin2, in permutations(coins,2):
        paths = nx.all_simple_paths(g, source=coin1[1], target=coin2[1])
        largest = 0
        smallest = 0
        for path in paths:
            rev_path = path[::-1]
            total_weight = 1
            total_weight_r = 1
            try:
                for w in range(len(path)-1):
                    n1 = path[w]
                    n2 = path[w + 1]
                    weight = g[n1][n2]["weight"]
                    if weight is not None:
                        total_weight *= weight
                
                for r in range(len(path)-1):
                    r1 = rev_path[r]
                    r2 = rev_path[r + 1]
                    weight_r = g[r1][r2]["weight"]
                    if weight_r is not None:
                        total_weight_r *= weight_r
            except:
                pass
                
            e_num = total_weight * total_weight_r
            if e_num > 1.001:  # Arbitrage opportunity detected
                results['_'.join(path)] = e_num
                trade_req(path)
    save_results(results)`
      },
      {
        title: "Automated Trading Implementation",
        language: "python",
        code: `def trade_req(path):
    fbuy = 0
    USD = "USD"
    for ticker in path:
        if fbuy == 0:
            sym = ticker.upper() + USD
            order_buy = api.submit_order(
                symbol = sym, 
                qty=1, 
                side='buy', 
                type = 'market', 
                time_in_force = "gtc"
            )
            fbuy += 1
            time.sleep(4)
        else:
            try:
                order = api.submit_order(
                    symbol = ticker.upper() + "/" + path[ticker-1],
                    qty = 1,
                    side = "buy",
                    type = "market",
                    time_in_force = "gtc"
                )
                time.sleep(4)
            except Exception as e:
                print("Could not order", ticker, "because:", e)`
      }
    ],
    challenges: [
      {
        title: "API Rate Limiting",
        description: "Dealing with API rate limits while maintaining real-time price data accuracy across multiple cryptocurrency pairs.",
        solution: "Implemented time delays between API calls and created a robust error handling system to manage rate limits while ensuring data consistency."
      },
      {
        title: "Graph Complexity",
        description: "Managing the computational complexity of finding all possible trading paths in a densely connected graph of trading pairs.",
        solution: "Optimized the path finding algorithm by filtering out irrelevant paths early and implementing efficient data structures for storing exchange rates."
      },
      {
        title: "Trade Execution Timing",
        description: "Ensuring that detected arbitrage opportunities could be executed before market conditions changed.",
        solution: "Added execution speed optimizations and implemented checks for price staleness before executing trades."
      }
    ]
  },
  {
    id: 2,
    title: "AI Personal Database Assistant",
    description: "Created an AI-powered system for personal knowledge management. Features include semantic search, automatic categorization, and natural language querying of personal notes and documents.",
    longDescription: "The AI Personal Database Assistant is a sophisticated knowledge management system that leverages the latest advances in natural language processing and machine learning to help users organize and retrieve information effectively.",
    tags: ["OpenAI API", "Python", "Vector DB", "React", "TypeScript"],
    imageUrl: "/images/ai-database.jpg",
    githubUrl: "https://github.com/yourusername/ai-database",
    liveUrl: "https://ai-database-demo.vercel.app",
    category: "web-dev",
    featured: true,
    technicalDetails: [
      {
        title: "Vector Database Integration",
        description: "Implemented Pinecone for efficient similarity search across document embeddings. Optimized query performance through custom indexing strategies."
      },
      {
        title: "Natural Language Processing",
        description: "Utilized OpenAI's GPT-3 API for text understanding and generation. Implemented custom prompt engineering for improved response quality."
      }
    ],
    codeSnippets: [
      {
        title: "Semantic Search Implementation",
        language: "typescript",
        code: `async function performSemanticSearch(query: string): Promise<SearchResult[]> {
  // Generate embedding for the search query
  const embedding = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: query
  });

  // Search vector database
  const results = await pinecone.query({
    vector: embedding.data[0].embedding,
    topK: 5,
    includeMetadata: true
  });

  return results.matches.map(match => ({
    id: match.id,
    score: match.score,
    content: match.metadata.text,
    source: match.metadata.source
  }));
}`
      }
    ],
    challenges: [
      {
        title: "Real-time Processing",
        description: "Processing large documents in real-time while maintaining system responsiveness was challenging.",
        solution: "Implemented background processing with Web Workers and progressive loading of results."
      }
    ]
  },
  {
    id: 3,
    title: "Voter Behavior Analysis",
    description: "Statistical analysis of voting patterns using demographic data. Built interactive visualizations to explore correlations between socioeconomic factors and voting behavior.",
    longDescription: "This project analyzes voting patterns across different demographic groups, providing insights into how various socioeconomic factors influence electoral behavior. The analysis includes interactive visualizations that allow users to explore relationships between variables.",
    tags: ["R", "D3.js", "Statistical Analysis", "GIS"],
    imageUrl: "/images/voter-analysis.jpg",
    githubUrl: "https://github.com/yourusername/voter-analysis",
    category: "data-viz",
    technicalDetails: [
      {
        title: "Data Integration",
        description: "Combined census data with voting records and geographic information using R and specialized GIS tools."
      },
      {
        title: "Statistical Analysis",
        description: "Performed multivariate regression analysis and hypothesis testing to identify significant correlations."
      }
    ],
    codeSnippets: [
      {
        title: "Geographic Data Processing",
        language: "r",
        code: `library(sf)
library(dplyr)

# Load and process geographic data
process_geographic_data <- function(voting_data, census_data) {
  # Join voting data with census information
  combined_data <- voting_data %>%
    left_join(census_data, by = "district_id") %>%
    st_as_sf()
  
  # Calculate voting statistics by district
  district_stats <- combined_data %>%
    group_by(district_id) %>%
    summarize(
      turnout_rate = mean(turnout),
      median_income = median(income),
      college_edu_rate = mean(college_education)
    )
    
  return(district_stats)
}`
      }
    ]
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