"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Check, AlertCircle, Send, Mail, MessageSquare } from "lucide-react"
import { sendContactEmail } from "@/actions/contact-form"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [contactPreference, setContactPreference] = useState<"form" | "email">("form")
  const [email, setEmail] = useState("")

  // Email obfuscation
  useEffect(() => {
    // Reconstruct the email on client-side to avoid scraping
    const username = "tim.rostorhuiev"
    const domain = "gmail.com"
    setEmail(`${username}@${domain}`)
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setFormStatus("submitting")

    try {
      const result = await sendContactEmail(data)

      if (result.success) {
        setFormStatus("success")
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus("idle")
        }, 5000)
      } else {
        setFormStatus("error")
        setErrorMessage(result.message)

        // Reset error message after 5 seconds
        setTimeout(() => {
          setFormStatus("idle")
          setErrorMessage("")
        }, 5000)
      }
    } catch (error) {
      setFormStatus("error")
      setErrorMessage("There was an unexpected error. Please try again later.")

      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="text-pink-600">Touch</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-6">
            Have a project in mind or want to collaborate? Feel free to reach out to me.
          </p>

          {/* Contact Preference Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-800 p-1 rounded-full flex">
              <button
                onClick={() => setContactPreference("form")}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  contactPreference === "form"
                    ? "bg-pink-600 text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                <MessageSquare size={16} className="mr-2" />
                Contact Form
              </button>
              <button
                onClick={() => setContactPreference("email")}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  contactPreference === "email"
                    ? "bg-pink-600 text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                <Mail size={16} className="mr-2" />
                Direct Email
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {contactPreference === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl"
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 bg-zinc-800 p-8 rounded-lg border border-zinc-700"
                >
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                        errors.name ? "border-red-500" : "border-zinc-600"
                      }`}
                      placeholder="John Doe"
                      {...register("name")}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                        errors.email ? "border-red-500" : "border-zinc-600"
                      }`}
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                        errors.subject ? "border-red-500" : "border-zinc-600"
                      }`}
                      placeholder="Project Inquiry"
                      {...register("subject")}
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                        errors.message ? "border-red-500" : "border-zinc-600"
                      }`}
                      placeholder="Hello, I'd like to talk about..."
                      {...register("message")}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center"
                    >
                      <Check size={20} className="text-green-500 mr-2" />
                      <p>Your message has been sent successfully!</p>
                    </motion.div>
                  )}

                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center"
                    >
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p>{errorMessage || "There was an error sending your message. Please try again."}</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl"
              >
                <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 text-center">
                  <Mail size={48} className="mx-auto mb-4 text-pink-600" />
                  <h3 className="text-2xl font-semibold mb-4">Want to reach out directly?</h3>
                  <p className="text-gray-300 mb-6">
                    Feel free to send me an email and I'll get back to you as soon as possible.
                  </p>

                  {/* Obfuscated Email */}
                  <div className="inline-block bg-zinc-700 px-6 py-4 rounded-lg">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `mailto:${email}`
                      }}
                      className="text-xl font-medium text-white hover:text-pink-600 transition-colors flex items-center justify-center"
                      aria-label="Email me"
                      data-email-username="tim.rostorhuiev"
                      data-email-domain="gmail.com"
                    >
                      <Mail size={20} className="mr-2" />
                      <span>{email || "tim.rostorhuiev" + String.fromCharCode(64) + "gmail.com"}</span>
                    </a>
                  </div>

                  <p className="mt-6 text-gray-400 text-sm">
                    Please include details about your project or inquiry to help me provide a better response.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
