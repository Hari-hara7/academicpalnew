"use client"

import { useState } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      })

      setSuccess("Thanks for contacting us! We'll get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      console.error("Error saving message: ", err)
      setError("Failed to send message. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-gray-100 py-12 px-6 md:px-20">
      <section className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 mt-8">
            Contact <span className="text-white">AcademicPal</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
            Have questions, feedback, or want to contribute? Reach out to us — we’re here to help!
          </p>
        </header>

        <Card className="bg-black border border-white/20 backdrop-blur-md rounded-lg shadow-md">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border border-white/30 text-white placeholder-gray-400 mt-4"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border border-white/30 text-white placeholder-gray-400 mt-4"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-transparent border border-white/30 text-white placeholder-gray-400 mt-4"
                />
              </div>

              {success && (
                <p className="text-green-400 font-medium">{success}</p>
              )}
              {error && (
                <p className="text-red-500 font-medium">{error}</p>
              )}

              <Button
                type="submit"
                className="bg-gray-200 text-black hover:bg-gray-300 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator className="border-gray-700" />

        <section>
          <h2 className="text-3xl font-semibold mb-6">Other Ways to Reach Us</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-white/80" />
              <a href="mailto:support@academicpal.com" className="underline hover:text-white transition">
                hariharanath247@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-white/80" />
              <a href="tel:+1234567890" className="underline hover:text-white transition">
                +91 7989777877
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-white/80" />
              <address className="not-italic">
                Karkala,Nitte,Karanataka
              </address>
            </li>
          </ul>
        </section>

        {/* Call to action buttons */}
        <div className="flex flex-wrap gap-4 mt-12">
          <Link href="/" passHref>
            <Button
              as="/home"
              variant="outline"
              className="bg-gray-200 text-black hover:bg-gray-300 transition"
            >
              Go to Homepage
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button
              as="a"
              className="bg-gray-200 text-black hover:bg-gray-300 transition"
            >
              About AcademicPal
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
