import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/config/db';
import Event from '../../../../lib/models/EventModel';
import Registration from '../../../../lib/models/RegistrationModel';

function getAgeRange(age) {
  if (!Number.isFinite(age) || age < 0) return 'Unknown';
  if (age < 13) return 'Under 13';
  if (age <= 17) return '13-17';
  if (age <= 24) return '18-24';
  if (age <= 34) return '25-34';
  return '35+';
}

function toValidAge(value) {
  const age = Number(value);
  return Number.isFinite(age) && age >= 0 ? age : null;
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'eventId is required' }, { status: 400 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const registrations = await Registration.find({ event: eventId }).sort({ registeredAt: 1 });

    const confirmedRegistrations = registrations.filter((reg) => reg.status === 'confirmed');
    const checkedInCount = registrations.filter((reg) => reg.checkedIn).length;
    const spotsRemaining = event.capacity > 0
      ? Math.max(0, event.capacity - confirmedRegistrations.length)
      : '∞';

    const genderDistribution = registrations.reduce((acc, reg) => {
      const key = reg.gender || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const ageDistribution = {
      'Under 13': 0,
      '13-17': 0,
      '18-24': 0,
      '25-34': 0,
      '35+': 0,
      Unknown: 0,
    };
    registrations.forEach((reg) => {
      const age = toValidAge(reg.age);
      ageDistribution[getAgeRange(age)] += 1;
    });

    const statusDistribution = {
      confirmed: 0,
      waitlist: 0,
      cancelled: 0,
    };
    registrations.forEach((reg) => {
      if (statusDistribution[reg.status] !== undefined) {
        statusDistribution[reg.status] += 1;
      }
    });

    const timelineMap = registrations.reduce((acc, reg) => {
      const dateKey = new Date(reg.registeredAt).toLocaleDateString('en-CA');
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    const timeline = Object.entries(timelineMap).map(([date, count]) => ({ date, count }));

    const validAges = registrations
      .map((reg) => toValidAge(reg.age))
      .filter((age) => age !== null);

    const averageAge = validAges.length
      ? Number((validAges.reduce((sum, age) => sum + age, 0) / validAges.length).toFixed(1))
      : 0;

    return NextResponse.json({
      success: true,
      eventAnalytics: {
        event: {
          _id: event._id,
          title: event.title,
          description: event.description,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          category: event.category,
          capacity: event.capacity || 0,
        },
        summary: {
          totalRegistrations: registrations.length,
          confirmedRegistrations: confirmedRegistrations.length,
          turnoutRate: confirmedRegistrations.length
            ? Number(((checkedInCount / confirmedRegistrations.length) * 100).toFixed(1))
            : 0,
          spotsRemaining,
          averageAge,
        },
        distributions: {
          gender: genderDistribution,
          age: ageDistribution,
          status: statusDistribution,
        },
        timeline,
        insights: {
          dietaryRestrictionsCount: registrations.filter(
            (reg) => reg.dietaryRestrictions && reg.dietaryRestrictions.trim()
          ).length,
        },
      },
    });
  } catch (error) {
    console.error('❌ Get event analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event analytics' },
      { status: 500 }
    );
  }
}
