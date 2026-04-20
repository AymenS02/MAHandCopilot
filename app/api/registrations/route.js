import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/config/db';
import Registration from '../../../lib/models/RegistrationModel';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const query = {};
    if (eventId) {
      query.event = eventId;
    }

    const registrations = await Registration.find(query)
      .populate('event', 'title date startTime location category capacity registeredAttendees')
      .sort({ registeredAt: -1 });

    const safeRegistrations = registrations.filter((reg) => reg.event);

    return NextResponse.json({
      success: true,
      count: safeRegistrations.length,
      registrations: safeRegistrations,
    });
  } catch (error) {
    console.error('❌ Get registrations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

