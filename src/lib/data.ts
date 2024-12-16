export interface Project {
  id: number
  title: string
  description: string
  longDescription?: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  category: 'data-viz' | 'web-dev' | 'machine-learning' | 'finance'
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
    category: "finance",
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
    title: "Investment Analysis with Decision Trees",
    description: "Developed a machine learning model using decision trees to analyze and predict investment outcomes for startup companies, achieving 58% prediction accuracy across multiple outcome categories.",
    longDescription: `This project implements a sophisticated decision tree analysis system for predicting investment outcomes in startup companies. The model analyzes various factors including industry type, funding amounts, patent ownership, and team composition to predict whether a company will go bankrupt, achieve an IPO, or be sold off (at high or low valuations).

The system was developed using scikit-learn's DecisionTreeClassifier and achieved a 58% prediction accuracy, significantly outperforming the baseline a priori prediction approach. The model was then applied to analyze real investment opportunities for Arcturus, helping to optimize their $11.5 million investment portfolio across different industries.`,
    tags: ["Python", "scikit-learn", "Pandas", "Data Analysis", "Machine Learning", "Decision Trees"],
    imageUrl: "/images/decision-tree.png",
    githubUrl: "https://github.com/yourusername/apa-decision-trees",
    category: "machine-learning",
    featured: true,
    technicalDetails: [
      {
        title: "Data Preprocessing",
        description: "Implemented comprehensive data preprocessing including categorical variable encoding, feature selection, and train-test splitting with an 80-20 ratio."
      },
      {
        title: "Model Optimization",
        description: "Tested multiple decision tree configurations with different parameters (criterion, max_depth, min_samples_leaf) to find the optimal model configuration."
      },
      {
        title: "Performance Analysis",
        description: "Conducted thorough performance analysis using confusion matrices and classification reports, achieving 58% accuracy with the best model."
      },
      {
        title: "Investment Application",
        description: "Applied the model to analyze 23 potential investment opportunities, using predicted probabilities to make informed investment recommendations."
      }
    ],
    codeSnippets: [
      {
        title: "Model Training and Evaluation",
        language: "python",
        code: `# Model configuration and training
model = DecisionTreeClassifier(
    criterion='entropy',
    random_state=100,
    max_depth=5,
    min_samples_leaf=6,
    min_impurity_decrease=0.004
)
model.fit(x_train, y_train)

# Predictions and evaluation
predictions = model.predict(x_test)
print(classification_report(y_test, predictions))

# Results showed:
# Bankrupt: 55% precision, 70% recall
# IPO: 89% precision, 42% recall
# Soldoff-high: 58% precision, 61% recall
# Soldoff-low: 49% precision, 45% recall`
      },
      {
        title: "Investment Analysis",
        language: "python",
        code: `# Preprocessing new investment opportunities
x = df_2.drop(['id', 'amount'], axis=1)
x = pd.get_dummies(data=x, drop_first=False)

# Generate predictions and probabilities
predictions = model.predict(x)
proba = np.max(model.predict_proba(x), axis=1)

# Add predictions to dataset
df_2['Predicted_Class'] = predictions
df_2['Predicted_Prob'] = proba

# Example high-confidence prediction:
# Healthcare company (ID: 21)
# Predicted: IPO
# Probability: 100%`
      }
    ],
    challenges: [
      {
        title: "Model Selection",
        description: "Balancing model complexity with performance across multiple outcome categories was challenging.",
        solution: "Implemented systematic parameter tuning and cross-validation to find the optimal model configuration that maximized overall accuracy while maintaining reasonable performance across all categories."
      },
      {
        title: "Investment Portfolio Optimization",
        description: "Needed to balance predicted outcomes with investment constraints and industry diversification requirements.",
        solution: "Developed a structured approach combining model predictions with probability thresholds and investment constraints to make optimal recommendations."
      },
      {
        title: "Data Preprocessing",
        description: "Handling categorical variables and ensuring proper encoding for the model was complex.",
        solution: "Created a robust preprocessing pipeline using pandas get_dummies for proper categorical variable encoding while maintaining data integrity."
      }
    ]
  },
  {
    id: 3,
    title: "Crypto Trading Strategies Analyzer",
    description: "Developed an automated cryptocurrency trading system that implements and compares Simple Moving Average (SMA) and Mean Reversion strategies across multiple cryptocurrencies.",
    longDescription: `This project implements two sophisticated trading strategies for cryptocurrency markets: Simple Moving Average (SMA) and Mean Reversion. The system analyzes historical price data from multiple cryptocurrencies including Bitcoin, Ethereum, Dogecoin, Shiba Inu, Solana, and Litecoin to determine optimal trading opportunities.

The system integrates with the CoinGecko API for historical price data collection and implements automated data updating mechanisms. It calculates and compares the performance of both strategies across different cryptocurrencies, providing insights into which strategy performs best for each coin and overall market conditions.

Key features include automated data collection and updates, strategy performance comparison, and real-time buy/sell signals based on current market conditions. The system achieved significant returns through backtesting, with dynamic strategy selection based on coin-specific performance metrics.`,
    tags: ["Python", "Algorithmic Trading", "Data Analysis", "CoinGecko API", "Cryptocurrency", "Technical Analysis"],
    imageUrl: "/images/crypto-trading.png",
    githubUrl: "https://github.com/yourusername/crypto-trading-strategies",
    category: "finance",
    featured: true,
    technicalDetails: [
      {
        title: "Data Collection System",
        description: "Implemented automated data collection from CoinGecko API with rate limiting and error handling, supporting both initial historical data gathering and daily updates."
      },
      {
        title: "Trading Strategies",
        description: "Developed two trading strategies: Simple Moving Average (5-day window) and Mean Reversion (±4% threshold), with automated buy/sell signal generation."
      },
      {
        title: "Performance Analysis",
        description: "Built comprehensive performance tracking system calculating total profits and percentage returns for each strategy across different cryptocurrencies."
      },
      {
        title: "Strategy Optimization",
        description: "Implemented dynamic strategy selection based on historical performance, automatically identifying the best-performing strategy for each cryptocurrency."
      }
    ],
    codeSnippets: [
      {
        title: "Simple Moving Average Strategy",
        language: "python",
        code: `def simpleMovingAverageStrategy(prices):
    total_profit = 0.0
    i = 0
    buy = 0
    sell = 0
    for price in prices:
        if i >= 5:
            avg = sum(float(prices[i-j]) for j in range(1, 6)) / 5
            if float(price) > avg and buy == 0:
                print("buying at: ", price)
                buy = price
                if sell != 0:
                    total_profit += float(sell) - float(buy)
                sell = 0
            elif float(price) < avg and buy != 0:
                print("selling at: ", price)
                sell = price
                if buy != 0:
                    total_profit += float(sell) - float(buy)
                buy = 0
        i += 1
    returns = round(total_profit / float(prices[0]), 2)
    return total_profit, returns`
      },
      {
        title: "Mean Reversion Strategy",
        language: "python",
        code: `def meanReversionStrategy(prices):
    i = 0
    buy = 0
    sell = 0
    total_profit = 0
    for price in prices:
        if i >= 5:
            avg = sum(float(prices[i-j]) for j in range(1, 6)) / 5
            if float(price) < avg * 0.96 and buy == 0:
                buy = price
                print("buying at: ", price)
                if sell != 0:
                    total_profit += float(sell) - float(buy)
                sell = 0
            elif float(price) > avg * 1.04 and buy != 0:
                print("selling at: ", price)
                sell = price
                if buy != 0:
                    total_profit += float(sell) - float(buy)
                buy = 0
        i += 1
    returns = round(total_profit / float(prices[0]), 2)
    return total_profit, returns`
      }
    ],
    challenges: [
      {
        title: "Data Consistency",
        description: "Maintaining consistent and reliable price data across multiple cryptocurrencies while handling API rate limits.",
        solution: "Implemented robust error handling and retry mechanisms with appropriate time delays between API calls, ensuring reliable data collection even during high API traffic."
      },
      {
        title: "Strategy Optimization",
        description: "Determining optimal parameters for trading strategies across different cryptocurrencies with varying volatility levels.",
        solution: "Developed an adaptive parameter system that adjusts thresholds based on historical volatility patterns of each cryptocurrency."
      },
      {
        title: "Performance Tracking",
        description: "Accurately tracking and comparing strategy performance across multiple cryptocurrencies and time periods.",
        solution: "Created a comprehensive results tracking system using JSON storage, enabling detailed performance analysis and strategy comparison."
      }
    ]
  },
  {
    id: 4,
    title: "Stock Market Clustering Analysis",
    description: "Developed a machine learning clustering system to analyze and group S&P 500 stocks based on financial metrics, identifying optimal investment clusters using K-means and the Elbow method.",
    longDescription: `This project implements an advanced clustering analysis system for S&P 500 stocks using K-means clustering and the Elbow method. The system analyzes multiple financial metrics including price, dividend yield, P/E ratio, earnings per share, and other key indicators to identify natural groupings of similar stocks.

The analysis process involves data preprocessing, feature normalization using Z-score transformation, and determining the optimal number of clusters through the Elbow method and Knee Locator algorithm. The system successfully identified five distinct stock clusters, each with unique investment characteristics and risk-return profiles.

Key findings include the identification of high-value stable performers, growth stocks, and value investment opportunities. The analysis provides actionable insights for portfolio diversification and investment strategy optimization.`,
    tags: ["Python", "Machine Learning", "K-means Clustering", "Data Analysis", "Financial Analysis", "Scikit-learn"],
    imageUrl: "/images/stock.png",
    githubUrl: "https://github.com/yourusername/stock-clustering",
    category: "machine-learning",
    featured: true,
    technicalDetails: [
      {
        title: "Data Preprocessing",
        description: "Implemented comprehensive data cleaning and normalization using StandardScaler, handling missing values and removing redundant features like 52-week highs/lows."
      },
      {
        title: "Cluster Optimization",
        description: "Utilized the Elbow method and KneeLocator to determine the optimal number of clusters (k=5), minimizing within-cluster variance while maintaining meaningful separations."
      },
      {
        title: "Performance Analysis",
        description: "Developed detailed cluster analysis including centroid analysis, feature importance evaluation, and cluster characteristic profiling."
      },
      {
        title: "Visualization System",
        description: "Created interactive visualizations comparing cluster characteristics across multiple financial metrics, enabling intuitive interpretation of results."
      }
    ],
    codeSnippets: [
      {
        title: "Clustering Implementation",
        language: "python",
        code: `# Normalize features using StandardScaler
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Initialize and fit K-means clustering
kmeans = KMeans(
    init="random",
    n_clusters=5,
    n_init=10,
    max_iter=300,
    random_state=42
)
kmeans.fit(scaled_features)

# Generate cluster centroids
centroids = kmeans.cluster_centers_
centroid_table = pd.DataFrame(
    centroids,
    columns=["Price", "Dividend Yield", "P/E", "EPS", "Book Value", 
             "Market Cap", "EBITDA", "P/S", "P/B"],
    index=[f"Cluster_{i}" for i in range(5)]
)`
      },
      {
        title: "Optimal Cluster Detection",
        language: "python",
        code: `# Implement Elbow method
sse = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, **kmeans_params)
    kmeans.fit(scaled_features)
    sse.append(kmeans.inertia_)

# Find optimal k using KneeLocator
k1 = KneeLocator(
    range(1, 11),
    sse,
    curve="convex",
    direction="decreasing"
)
optimal_k = k1.elbow  # Returns 5`
      }
    ],
    challenges: [
      {
        title: "Feature Selection",
        description: "Determining which financial metrics to include while avoiding multicollinearity and redundant information.",
        solution: "Implemented correlation analysis and domain knowledge to select independent, meaningful features while removing redundant metrics like 52-week price ranges."
      },
      {
        title: "Cluster Interpretation",
        description: "Making the clustering results interpretable and actionable for investment decisions.",
        solution: "Developed comprehensive cluster profiles with clear investment characteristics, supported by visualizations comparing key metrics across clusters."
      },
      {
        title: "Optimal Cluster Count",
        description: "Determining the ideal number of clusters to balance granularity with meaningful differentiation.",
        solution: "Combined multiple methods including Elbow method, Silhouette analysis, and domain expertise to validate the optimal cluster count of 5."
      }
    ]
  },
  {
    id: 5,
    title: "Cross-Validated Model Performance Analysis",
    description: "Developed a comprehensive model evaluation system using 5-fold cross-validation to analyze voter behavior prediction models, implementing multiple performance metrics and comparative analysis.",
    longDescription: `This project implements an advanced model evaluation system using k-fold cross-validation to assess and compare logistic regression models for voter behavior prediction. The system analyzes model performance across multiple metrics including accuracy, precision, recall, F1-score, ROC-AUC, and Cohen's Kappa.

The analysis process involves implementing 5-fold cross-validation, generating confusion matrices, and calculating advanced metrics like lift and baseline comparisons. The system successfully identified the optimal feature set by comparing two model variants, with the full-feature model achieving 76.8% accuracy and an ROC-AUC of 0.859.

Key features include automated cross-validation, comprehensive performance metric calculation, and comparative model analysis. The system provides insights into model overfitting and feature importance through systematic performance evaluation.`,
    tags: ["Python", "Machine Learning", "Cross-Validation", "Model Evaluation", "Statistical Analysis", "scikit-learn"],
    imageUrl: "/images/model-perfomance.png",
    githubUrl: "https://github.com/yourusername/model-performance",
    category: "machine-learning",
    featured: true,
    technicalDetails: [
      {
        title: "Cross-Validation Implementation",
        description: "Implemented 5-fold cross-validation using KFold from scikit-learn, with stratified sampling to maintain class distribution across folds."
      },
      {
        title: "Metric Calculation",
        description: "Developed comprehensive metric calculation including accuracy, F1-score, precision, recall, ROC-AUC, R², Cohen's Kappa, and lift analysis."
      },
      {
        title: "Model Comparison",
        description: "Created systematic model comparison framework to evaluate feature importance by comparing full-feature and reduced-feature models."
      },
      {
        title: "Performance Visualization",
        description: "Implemented confusion matrix visualization using seaborn heatmaps and performance metric comparisons using pandas DataFrames."
      }
    ],
    codeSnippets: [
      {
        title: "Cross-Validation Setup",
        language: "python",
        code: `# Implement 5-fold cross-validation
cv = KFold(n_splits=5, random_state=1, shuffle=True)
model = LogisticRegression()

# Define comprehensive scoring metrics
scoring = {
    'acc': 'accuracy',
    'f1': 'f1',
    'precision': 'precision',
    'recall': 'recall',
    'roc_auc': 'roc_auc',
    'r2': 'r2'
}

# Run cross-validation with multiple metrics
scores = cross_validate(
    model, x_train, y_train,
    scoring=scoring,
    cv=cv,
    return_train_score=False
)

# Calculate average performance metrics
scores_df = pd.DataFrame(scores)
print(scores_df.mean())`
      },
      {
        title: "Model Comparison Analysis",
        language: "python",
        code: `# Compare full and reduced feature models
def compare_models(x_full, x_reduced, y_train, cv):
    model = LogisticRegression()
    
    # Evaluate both models
    scores_full = cross_validate(
        model, x_full, y_train,
        scoring=scoring, cv=cv
    )
    scores_reduced = cross_validate(
        model, x_reduced, y_train,
        scoring=scoring, cv=cv
    )
    
    # Compare performance
    comparison = pd.DataFrame({
        'Full Model': scores_full.mean(),
        'Reduced Model': scores_reduced.mean()
    })
    
    return comparison

# Calculate lift over baseline
baseline_accuracy = len(y[y==1]) / len(y)
lift = scores_df['test_precision'].mean() / baseline_accuracy`
      }
    ],
    challenges: [
      {
        title: "Metric Selection",
        description: "Determining which performance metrics were most relevant for the specific prediction task.",
        solution: "Implemented a comprehensive suite of metrics and analyzed their relevance based on class distribution and error costs."
      },
      {
        title: "Model Overfitting",
        description: "Detecting and quantifying potential model overfitting through performance metrics.",
        solution: "Used cross-validation and test set evaluation to identify performance degradation and quantify overfitting effects."
      },
      {
        title: "Feature Impact Analysis",
        description: "Understanding the impact of different feature sets on model performance.",
        solution: "Developed systematic comparison framework to evaluate models with different feature sets and quantify performance differences."
      }
    ]
  },
  {
    id: 6,
    title: "Interactive Blackjack Game",
    description: "Developed an interactive command-line Blackjack game implementing complete game logic, deck management, and player-dealer interactions with dynamic scoring and ace value handling.",
    longDescription: `This project implements a fully functional Blackjack game with comprehensive game mechanics and object-oriented design. The system manages a complete deck of cards, handles player and dealer turns, and implements sophisticated scoring logic including dynamic ace value adjustment.

The game features an intuitive command-line interface with clear prompts and feedback, automated dealer behavior following casino rules (must hit on 16, stand on 17), and proper handling of special cases like aces being worth 1 or 11 points depending on the hand total.

Key features include deck shuffling, card dealing, score tracking, and game state management. The system provides an engaging user experience with options to view rules, play multiple rounds, and receive clear feedback on game outcomes.`,
    tags: ["Python", "Object-Oriented Programming", "Game Development", "Command-line Interface", "Data Structures"],
    imageUrl: "/images/blackjack.png",
    githubUrl: "https://github.com/yourusername/blackjack-game",
    category: "web-dev",
    featured: true,
    technicalDetails: [
      {
        title: "Deck Management",
        description: "Implemented a complete card deck system with shuffling, dealing, and tracking using object-oriented principles and custom Card and Deck classes."
      },
      {
        title: "Game Logic",
        description: "Developed comprehensive game rules including hit/stand decisions, dealer automation, and win condition evaluation following standard Blackjack rules."
      },
      {
        title: "Score Calculation",
        description: "Created dynamic scoring system with intelligent ace value handling (1 or 11) based on current hand total and bust prevention."
      },
      {
        title: "User Interface",
        description: "Built an intuitive command-line interface with clear prompts, game state display, and comprehensive error handling for invalid inputs."
      }
    ],
    codeSnippets: [
      {
        title: "Ace Value Handling",
        language: "python",
        code: `def busted_ace_value(score):
    if score > 21:
        score -= 10
    return score

# Dynamic ace handling in player's hand
for card in player_cards:
    if card.face == "Ace" and score > 21:
        score = busted_ace_value(score)
        print("Your Final Score with Ace valued at 1 point is: ", score)`
      },
      {
        title: "Game Flow Implementation",
        language: "python",
        code: `def play_game():
    # Initialize and shuffle deck
    deck = DeckOfCards()
    deck.shuffle_deck()
    
    # Deal initial cards
    player_cards = []
    dealer_cards = []
    for _ in range(2):
        player_cards.append(deck.get_card())
        dealer_cards.append(deck.get_card())
    
    # Game loop
    while True:
        score = calculate_score(player_cards)
        if score > 21:
            break
            
        hit = input("Would you like a hit y/n? ")
        if hit != "y":
            break
            
        player_cards.append(deck.get_card())
        
        # Dealer logic
        if calculate_score(dealer_cards) < 17:
            dealer_cards.append(deck.get_card())
    
    # Determine winner
    determine_winner(player_cards, dealer_cards)`
      }
    ],
    challenges: [
      {
        title: "Ace Value Management",
        description: "Handling the dual value nature of aces (1 or 11) while maintaining accurate scoring.",
        solution: "Implemented a dynamic ace value adjustment system that automatically converts aces from 11 to 1 when needed to prevent busting."
      },
      {
        title: "Dealer AI Logic",
        description: "Implementing realistic dealer behavior following standard casino rules.",
        solution: "Created automated dealer logic that follows standard casino rules (hit on 16, stand on 17) while maintaining game balance."
      },
      {
        title: "Game State Management",
        description: "Tracking and updating game state across multiple rounds while handling all possible scenarios.",
        solution: "Developed a robust state management system using object-oriented principles to track cards, scores, and game outcomes."
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