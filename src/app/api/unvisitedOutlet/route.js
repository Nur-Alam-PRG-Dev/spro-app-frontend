import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { aemp_id, role_id, country_id, date, end_date } = body;

    if (!aemp_id || !role_id || !country_id || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters: aemp_id, role_id, country_id, or date.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.UNVISITED_OUTLET_API_KEY || 'f06ff43be3310989';
    const baseUrl = process.env.SPRO_API_BASE_URL || 'http://sprodevtest.prgfms.com/';

    // Create x-www-form-urlencoded payload
    const params = new URLSearchParams();
    params.append('aemp_id', aemp_id);
    params.append('role_id', role_id);
    params.append('country_id', country_id);
    params.append('date', date);
    if (end_date) {
      params.append('end_date', end_date);
    }

    const response = await fetch(`${baseUrl}api/v8/unvisited-outlet`, {
      method: 'POST',
      headers: {
        'ApiKey': apiKey,
        'App-Language': 'en',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upstream API failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching unvisited outlets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unvisited outlets from server' },
      { status: 500 }
    );
  }
}
