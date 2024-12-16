'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import visualization libraries to reduce initial bundle size
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface DataVisualizationProps {
    projectId: number
}

interface VisualizationData {
    type: 'line' | 'bar' | 'scatter' | 'heatmap' | 'network'
    data: any
    layout: any
}

export default function DataVisualization({ projectId }: DataVisualizationProps) {
    const [data, setData] = useState<VisualizationData | null>(null)
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // In a real application, you would fetch this data from your API
        // For now, we'll use mock data based on the project ID
        const mockData = getMockData(projectId)
        setData(mockData)
        setLoading(false)
    }, [projectId])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400">
                No visualization data available
            </div>
        )
    }

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
        >
            <Plot
                data={data.data}
                layout={{
                    ...data.layout,
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    autosize: true,
                    margin: { t: 20, r: 20, b: 40, l: 40 },
                    font: {
                        color: '#718096'
                    },
                    xaxis: data.type !== 'network' ? {
                        ...data.layout.xaxis,
                        gridcolor: '#2D3748',
                        zerolinecolor: '#2D3748'
                    } : undefined,
                    yaxis: data.type !== 'network' ? {
                        ...data.layout.yaxis,
                        gridcolor: '#2D3748',
                        zerolinecolor: '#2D3748'
                    } : undefined,
                    showlegend: true
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: data.type === 'network' ? '600px' : '400px' }}
                config={{
                    responsive: true,
                    displayModeBar: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: ['lasso2d', 'select2d']
                }}
            />
        </motion.div>
    )
}

function getMockData(projectId: number): VisualizationData {
    // Mock data for different project types
    switch (projectId) {
        case 4: // Investment Analysis Decision Tree
            const nodes = ['Root', 'Tech?', 'Patents?', 'Funding>5M', 'Elites>3', 'IPO', 'Bankrupt', 'SoldHigh', 'SoldLow']
            const edges: [string, string, number][] = [
                ['Root', 'Tech?', 1],
                ['Tech?', 'Patents?', 0.7],
                ['Tech?', 'Funding>5M', 0.3],
                ['Patents?', 'Elites>3', 0.6],
                ['Patents?', 'Bankrupt', 0.4],
                ['Funding>5M', 'IPO', 0.5],
                ['Funding>5M', 'SoldHigh', 0.5],
                ['Elites>3', 'SoldHigh', 0.7],
                ['Elites>3', 'SoldLow', 0.3]
            ]

            // Create tree visualization
            const decisionTreeNodeTrace = {
                x: nodes.map((_, i) => Math.cos(2 * Math.PI * i / nodes.length) * (i === 0 ? 0 : 1)),
                y: nodes.map((_, i) => Math.sin(2 * Math.PI * i / nodes.length) * (i === 0 ? 0 : 1)),
                mode: 'markers+text',
                type: 'scatter',
                name: 'Decision Nodes',
                text: nodes,
                textposition: 'top center',
                hoverinfo: 'text',
                marker: {
                    size: 30,
                    color: nodes.map(n => 
                        n === 'IPO' ? '#10B981' :  // Green for IPO
                        n === 'Bankrupt' ? '#EF4444' :  // Red for Bankrupt
                        n === 'SoldHigh' ? '#3B82F6' :  // Blue for SoldHigh
                        n === 'SoldLow' ? '#F59E0B' :  // Yellow for SoldLow
                        '#6B7280'  // Gray for decision nodes
                    )
                }
            }

            const decisionTreeEdgeTraces = edges.map(([from, to, prob]) => {
                const fromIdx = nodes.indexOf(from)
                const toIdx = nodes.indexOf(to)
                return {
                    x: [
                        Math.cos(2 * Math.PI * fromIdx / nodes.length) * (fromIdx === 0 ? 0 : 1),
                        Math.cos(2 * Math.PI * toIdx / nodes.length) * (toIdx === 0 ? 0 : 1)
                    ],
                    y: [
                        Math.sin(2 * Math.PI * fromIdx / nodes.length) * (fromIdx === 0 ? 0 : 1),
                        Math.sin(2 * Math.PI * toIdx / nodes.length) * (toIdx === 0 ? 0 : 1)
                    ],
                    mode: 'lines+text',
                    type: 'scatter',
                    name: `${from}-${to}`,
                    text: [null, (prob * 100).toFixed(0) + '%'],
                    textposition: 'middle',
                    line: { 
                        width: 2,
                        color: '#4B5563'
                    },
                    hoverinfo: 'text',
                    hovertext: `Probability: ${(prob * 100).toFixed(0)}%`
                }
            })

            return {
                type: 'network',
                data: [decisionTreeNodeTrace, ...decisionTreeEdgeTraces],
                layout: {
                    title: 'Decision Tree Structure',
                    showlegend: false,
                    xaxis: {
                        showgrid: false,
                        zeroline: false,
                        showticklabels: false,
                        range: [-1.5, 1.5]
                    },
                    yaxis: {
                        showgrid: false,
                        zeroline: false,
                        showticklabels: false,
                        range: [-1.5, 1.5]
                    }
                }
            }

        case 1: // Crypto Disequilibrium
            const cryptoNodes = ['BTC', 'ETH', 'XRP', 'USDT', 'BNB']
            const cryptoEdges: [string, string, number][] = [
                ['BTC', 'ETH', 0.068],
                ['ETH', 'XRP', 0.00042],
                ['XRP', 'USDT', 0.52],
                ['USDT', 'BTC', 0.000034],
                ['BNB', 'ETH', 0.15],
                ['BTC', 'BNB', 0.075]
            ]

            // Create network visualization data
            const cryptoNodeTrace = {
                x: cryptoNodes.map((_, i) => Math.cos(2 * Math.PI * i / cryptoNodes.length)),
                y: cryptoNodes.map((_, i) => Math.sin(2 * Math.PI * i / cryptoNodes.length)),
                mode: 'markers+text',
                type: 'scatter',
                name: 'Cryptocurrencies',
                text: cryptoNodes,
                textposition: 'top center',
                hoverinfo: 'text',
                marker: {
                    size: 20,
                    color: '#3182CE'
                }
            }

            const cryptoEdgeTraces = cryptoEdges.map(([from, to, rate]) => {
                const fromIdx = cryptoNodes.indexOf(from)
                const toIdx = cryptoNodes.indexOf(to)
                return {
                    x: [Math.cos(2 * Math.PI * fromIdx / cryptoNodes.length), Math.cos(2 * Math.PI * toIdx / cryptoNodes.length)],
                    y: [Math.sin(2 * Math.PI * fromIdx / cryptoNodes.length), Math.sin(2 * Math.PI * toIdx / cryptoNodes.length)],
                    mode: 'lines+text',
                    type: 'scatter',
                    name: `${from}-${to}`,
                    text: [null, rate.toString()],
                    textposition: 'middle',
                    line: { 
                        width: 2,
                        color: '#4299E1'
                    },
                    hoverinfo: 'text',
                    hovertext: `Rate: ${rate}`
                }
            })

            return {
                type: 'network',
                data: [cryptoNodeTrace, ...cryptoEdgeTraces],
                layout: {
                    title: 'Cryptocurrency Exchange Network',
                    showlegend: false,
                    xaxis: {
                        showgrid: false,
                        zeroline: false,
                        showticklabels: false,
                        range: [-1.5, 1.5]
                    },
                    yaxis: {
                        showgrid: false,
                        zeroline: false,
                        showticklabels: false,
                        range: [-1.5, 1.5]
                    }
                }
            }

        case 3: // Voter Analysis
            return {
                type: 'bar',
                data: [{
                    x: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                    y: [65, 72, 68, 75, 82, 85],
                    type: 'bar',
                    marker: {
                        color: ['#3182CE', '#4299E1', '#63B3ED', '#90CDF4', '#BEE3F8', '#EBF8FF']
                    }
                }],
                layout: {
                    title: 'Voter Turnout by Age Group',
                    xaxis: { title: 'Age Group' },
                    yaxis: { title: 'Turnout %' }
                }
            }
        default:
            return {
                type: 'scatter',
                data: [{
                    x: Array.from({ length: 20 }, (_, i) => i),
                    y: Array.from({ length: 20 }, () => Math.random() * 100),
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#3182CE' }
                }],
                layout: {
                    title: 'Sample Data Visualization',
                    xaxis: { title: 'X Axis' },
                    yaxis: { title: 'Y Axis' }
                }
            }
    }
} 