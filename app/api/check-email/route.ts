import { NextResponse } from 'next/server'
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const { db } = await connectToDatabase()
    
    const user = await db.collection("users").findOne({ email })
    
    return NextResponse.json({ exists: !!user })
  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}