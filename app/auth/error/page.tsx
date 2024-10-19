"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  const router = useRouter()

  useEffect(() => {
    // You can add any error logging or analytics here
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366]">
      <Card className="w-full max-w-md bg-opacity-10 bg-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-white mb-4">There was an error during the authentication process. Please try again.</p>
          <Button onClick={() => router.push('/auth/signin')} className="bg-yellow-400 text-black hover:bg-yellow-500">
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}