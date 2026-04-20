import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/config/db';
import Program from '../../../lib/models/ProgramModel';

export async function GET() {
  try {
    await connectDB();
    const programs = await Program.find({}).sort({ createdAt: -1 });

    // Keep array response for existing mah-youth page compatibility.
    return NextResponse.json(programs);
  } catch (error) {
    console.error('❌ Get programs error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

