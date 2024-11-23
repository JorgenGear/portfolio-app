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
                            title="Co-Owner/Business Analyst"
                            company="Jorgensen Outfitters"
                            date="Present"
                            location="Logan, Utah"
                            description={[
                                "Manage all aspects of an online retail business, including finances, product selection, website design, marketing, and business strategy",
                                "Track and analyze SEO, financial, and operational metrics to drive strategic decisions and improve performance"
                            ]}
                        />
                        <TimelineItem
                            title="Product Manager (Intern)"
                            company="FamilySearch"
                            date="Present"
                            location="Lehi, Utah"
                            description={[
                                "Manage two product teams with a PM mentor",
                                "Analyze data surrounding the products and present to major stakeholders",
                                "Organize user testing efforts to improve existing product features",
                                "Managed efforts of web developers, UX designers, and QA engineers"
                            ]}
                        />
                        <TimelineItem
                            title="Co-Owner/Manager"
                            company="Q&R Box Gardens"
                            date="2018 - 2021"
                            location="Springville, Utah"
                            description={[
                                "Developed designs for various raised garden beds, which were constructed and sold",
                                "Managed finances, material procurement, schedules, product development, production, marketing, sales",
                                "Managed over 20 employees, including payroll, HR, OSHA compliance, and scheduling"
                            ]}
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
                            <h3 className="font-bold text-xl">MS Management of Information Systems</h3>
                            <p className="text-gray-600 dark:text-gray-400">Utah State University • Expected 2025</p>
                        </div>
                        <div className="border-l-2 border-blue-600 pl-4">
                            <h3 className="font-bold text-xl">BS Technology Systems</h3>
                            <p className="text-gray-600 dark:text-gray-400">Utah State University • 2021 - 2024</p>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                                Graduated Magna Cum Laude
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
                        {/* Programming Languages */}
                        <SkillCard
                            name="Python"
                            iconName="python"
                            level={90}
                            description="Data analysis, ML models, Django development"
                        />
                        <SkillCard
                            name="SQL"
                            iconName="database"
                            level={85}
                            description="Database design, complex queries, MS SQL Server"
                        />
                        <SkillCard
                            name="TypeScript/JavaScript"
                            iconName="typescript"
                            level={80}
                            description="React, Web development, API integration"
                        />
                        
                        {/* Development Tools */}
                        <SkillCard
                            name="AWS & Cloud"
                            iconName="aws"
                            level={75}
                            description="Cloud9, Cloud Architecture, Deployment"
                        />
                        <SkillCard
                            name="Version Control"
                            iconName="git"
                            level={85}
                            description="Git, GitHub, collaborative development"
                        />
                        <SkillCard
                            name="Development Tools"
                            iconName="tools"
                            level={85}
                            description="VS Code, Jupyter, SSMS, Oracle VM"
                        />
                        
                        {/* Domain Knowledge */}
                        <SkillCard
                            name="Financial Markets"
                            iconName="chart"
                            level={85}
                            description="Crypto, Equities, Market Analysis"
                        />
                        <SkillCard
                            name="UI/UX Design"
                            iconName="design"
                            level={80}
                            description="Adobe Suite, CAD, User Experience"
                        />
                        <SkillCard
                            name="Web Development"
                            iconName="web"
                            level={85}
                            description="HTML, CSS, React, Django, APIs"
                        />
                    </div>
                </motion.section>
            </motion.div>
        </Suspense>
    )
}
