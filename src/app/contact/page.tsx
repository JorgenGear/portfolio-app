'use client'

import { useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import FloatingLabelInput from '@/components/FloatingLabelInput'
import ContactBackground from '@/components/ContactBackground'

interface FormState {
    name: string
    email: string
    message: string
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Contact() {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Add your form submission logic here
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <ContactBackground />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
                >
                    <motion.div variants={itemVariants} className="text-center">
                        <h1 className="text-5xl font-bold mb-4 text-white">Get in Touch</h1>
                        <p className="text-xl text-gray-200">
                            Have a question or want to work together?
                        </p>
                    </motion.div>

                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        <FloatingLabelInput
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            label="Name"
                            required
                        />
                        <FloatingLabelInput
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            label="Email"
                            required
                        />
                        <FloatingLabelInput
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            label="Message"
                            required
                            isTextArea
                            rows={5}
                        />

                        <motion.button
                            type="submit"
                            disabled={isSubmitting || isSubmitted}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium 
                                   disabled:opacity-70 relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-blue-500 transform origin-left"
                                initial={false}
                                animate={{ scaleX: isSubmitting ? 1 : 0 }}
                                transition={{ duration: 1.5 }}
                            />
                            <span className="relative">
                                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                            </span>
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}
