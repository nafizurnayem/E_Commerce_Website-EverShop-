import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    jwtSecretExists: !!process.env.JWT_SECRET,
    jwtSecretLength: process.env.JWT_SECRET?.length || 0,
    jwtSecretStart: process.env.JWT_SECRET?.substring(0, 10) || 'undefined',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('JWT') || key.includes('SECRET'))
  });
}