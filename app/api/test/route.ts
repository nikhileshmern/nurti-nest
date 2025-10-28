import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    testMode: process.env.NEXT_PUBLIC_TEST_MODE === 'true'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: 'Test API endpoint working!',
      receivedData: body,
      testMode: process.env.NEXT_PUBLIC_TEST_MODE === 'true',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Invalid JSON', 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 400 })
  }
}
