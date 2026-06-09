import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, hris_status = 0 } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email/Staff ID and Password are required.' },
        { status: 400 }
      );
    }

    const loginUrl = process.env.SPRO_LOGIN_API_URL || 'http://dashboard.prgfms.com/api/v1/login';

    // Create payload using URLSearchParams to match application/x-www-form-urlencoded
    const payload = new URLSearchParams({
      email,
      password,
      hris_status: hris_status.toString()
    });

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'ApiKey': process.env.UNVISITED_OUTLET_API_KEY || 'f06ff43be3310989',
        'App-Language': 'en'
      },
      body: payload.toString()
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid Staff ID or Password.' },
          { status: 401 }
        );
      }
      const errorText = await response.text();
      throw new Error(`Upstream API failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Add BASE_IMAGE_URL to the response so frontend can use it
    const baseImageUrl = process.env.BASE_IMAGE_URL || 'https://prgspro.sgp1.cdn.digitaloceanspaces.com/';
    
    return NextResponse.json({
      status: 'success',
      data: data,
      baseImageUrl: baseImageUrl
    });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate user.' },
      { status: 500 }
    );
  }
}
