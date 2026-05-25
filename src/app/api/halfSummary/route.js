import { NextResponse } from 'next/server';
import halfSummaryData from '@/dummyData/halfSummary.json';

export async function GET() {
  return NextResponse.json(halfSummaryData);
}
