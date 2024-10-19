"use client"

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) setEmail(emailParam)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      // If signup is successful, sign in the user
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Error during signup. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366]">
      <Card className="w-full max-w-md bg-opacity-10 bg-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-opacity-20 bg-white text-white placeholder-gray-300"
              disabled
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-opacity-20 bg-white text-white placeholder-gray-300"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-opacity-20 bg-white text-white placeholder-gray-300"
            />
            <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}