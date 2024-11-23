'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa'
import TimelineItem from '@/components/TimelineItem'
import SkillCard from '@/components/SkillCard'
import ResumeLoading from './loading'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Resume() {
    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('/api/generate-pdf')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'resume.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Error downloading PDF:', error)
        }
    }

    return (
        <Suspense fallback={<ResumeLoading />}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 py-12"
            >
                {/* Header Section */}
                <motion.div variants={sectionVariants} className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Resume</h1>
                    <div className="flex justify-center gap-4">
                        <motion.button
                            onClick={handleDownloadPDF}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Download PDF
                        </motion.button>
                        <motion.a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            LinkedIn Profile
                        </motion.a>
                    </div>
                </motion.div>

                {/* Experience Section */}
                <motion.section variants={sectionVariants} className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <FaBriefcase className="text-blue-600" />
                        <h2 className="text-2xl font-bold">Experience</h2>
                    </div>

                    <div className="space-y-8">
                        <TimelineItem
                            title="Senior Data Analyst"
                            company="Company Name"
                            date="2020 - Present"
                            description={[
                                "Led data visualization projects using D3.js and Tableau",
                                "Developed predictive models using Python and scikit-learn",
                                "Improved data processing efficiency by 40%"
                            ]}
                        />
                        <TimelineItem
                            title="Data Scientist"
                            company="Previous Company"
                            date="2018 - 2020"
                            description={[
                                "Implemented machine learning models for customer segmentation",
                                "Created automated reporting dashboards",
                                "Mentored junior analysts"
                            ]}
                            delay={0.2}
                        />
                    </div>
                </motion.section>

                {/* Education Section */}
                <motion.section variants={sectionVariants} className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <FaGraduationCap className="text-blue-600" />
                        <h2 className="text-2xl font-bold">Education</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="border-l-2 border-blue-600 pl-4">
                            <h3 className="font-bold text-xl">BS in Computer Science</h3>
                            <p className="text-gray-600 dark:text-gray-400">University Name • 2016 - 2020</p>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                                Relevant coursework: Data Structures, Algorithms, Machine Learning
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Skills Section */}
                <motion.section variants={sectionVariants}>
                    <div className="flex items-center gap-2 mb-6">
                        <FaCode className="text-blue-600" />
                        <h2 className="text-2xl font-bold">Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SkillCard
                            name="Python"
                            iconName="python"
                            level={90}
                            description="Data analysis, ML models, automation scripts"
                        />
                        <SkillCard
                            name="React"
                            iconName="react"
                            level={85}
                            description="Frontend development, component architecture"
                        />
                        <SkillCard
                            name="D3.js"
                            iconName="d3"
                            level={80}
                            description="Interactive data visualizations"
                        />
                        <SkillCard
                            name="TypeScript"
                            iconName="typescript"
                            level={85}
                            description="Type-safe JavaScript development"
                        />
                        <SkillCard
                            name="Next.js"
                            iconName="nextjs"
                            level={80}
                            description="Full-stack React applications"
                        />
                        <SkillCard
                            name="Git"
                            iconName="git"
                            level={85}
                            description="Version control and collaboration"
                        />
                    </div>
                </motion.section>
            </motion.div>
        </Suspense>
    )
}
