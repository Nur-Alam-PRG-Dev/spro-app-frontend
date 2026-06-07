import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { aemp_id, start_date, end_date, country_id = 26, report_type = 'team_wise' } = body;

    const payload = {
      country_id,
      aemp_id,
      start_date,
      end_date,
      report_type
    };

    const baseUrl = process.env.SPRO_API_BASE_URL;
    const apiKey = process.env.SPRO_API_KEY;

    if (!baseUrl || !apiKey) {
      return NextResponse.json({ error: 'Server configuration missing.' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}api/v1/report/srHalfSummaryReport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in halfSummary proxy:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
