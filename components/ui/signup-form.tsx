"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

export const SignUpFormDemo = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your form submission logic here
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {!isSubmitted ? (
        <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className={cn(
                "w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline",
              )}
            >
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Thank you for signing up!</h2>
          <p>We'll be in touch soon.</p>
        </div>
      )}
    </div>
  )
}

