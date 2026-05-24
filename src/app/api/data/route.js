import { NextResponse } from 'next/server';
import apiData from '@/dummyData/uncoveredOutlets.json';

export async function GET() {
  return NextResponse.json(apiData);
}
