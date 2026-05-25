import { NextResponse } from 'next/server';
import targetData from '@/dummyData/targetVsAchievement.json';

export async function GET() {
  return NextResponse.json(targetData);
}
