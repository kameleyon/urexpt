"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-4">You are signed in as: {session.user?.email}</p>
      <Button
        onClick={() => router.push('/')}
        className="bg-yellow-400 text-black hover:bg-yellow-500"
      >
        Go to Home
      </Button>
    </div>
  )
}