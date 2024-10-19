"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [step, setStep] = useState('email')
  const [isNewUser, setIsNewUser] = useState(false)
  const router = useRouter()

  const checkEmail = async () => {
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      setIsNewUser(!data.exists)
      setStep('password')
    } catch (error) {
      console.error('Error checking email:', error)
      toast.error('Error checking email. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'email') {
      await checkEmail()
    } else {
      if (isNewUser && password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        isNewUser: isNewUser.toString(),
      })

      if (result?.error) {
        console.error(result.error)
        toast.error(result.error)
      } else {
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366]">
      <Card className="w-full max-w-md bg-opacity-10 bg-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'email' ? (
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-opacity-20 bg-white text-white placeholder-gray-300"
              />
            ) : (
              <>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-opacity-20 bg-white text-white placeholder-gray-300"
                />
                {isNewUser && (
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-opacity-20 bg-white text-white placeholder-gray-300"
                  />
                )}
              </>
            )}
            <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
              {step === 'email' ? 'Next' : (isNewUser ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}