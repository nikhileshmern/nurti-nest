import { NextRequest, NextResponse } from 'next/server'
import { getTrackingInfo } from '@/lib/shiprocket'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const awb = searchParams.get('awb')

    if (!awb) {
      return NextResponse.json(
        { error: 'AWB code is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching tracking info for AWB:', awb)

    const trackingData = await getTrackingInfo(awb)

    console.log('✅ Tracking info retrieved')

    return NextResponse.json({
      success: true,
      tracking: trackingData,
    })
  } catch (error) {
    console.error('❌ Failed to get tracking info:', error)
    return NextResponse.json(
      {
        error: 'Failed to get tracking information',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

