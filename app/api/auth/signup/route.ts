import { NextResponse } from 'next/server'
import { connectToDatabase } from "@/lib/mongodb"
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const { db } = await connectToDatabase()
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10)
    
    // Create new user
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    })
    
    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId })
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}