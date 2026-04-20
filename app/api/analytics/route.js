import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/config/db';
import Event from '../../../lib/models/EventModel';
import Registration from '../../../lib/models/RegistrationModel';

function getAgeRange(age) {
  if (age < 13) return 'Under 13';
  if (age <= 17) return '13-17';
  if (age <= 24) return '18-24';
  if (age <= 34) return '25-34';
  return '35+';
}

function getLastSixMonthKeys() {
  const now = new Date();
  const keys = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    });
  }
  return keys;
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    const eventQuery = {};
    if (category && category !== 'all') {
      eventQuery.category = category;
    }

    const events = await Event.find(eventQuery).sort({ date: -1 });
    const eventIds = events.map((event) => event._id);

    let registrations = await Registration.find({ event: { $in: eventIds } })
      .populate('event', 'title date category capacity')
      .sort({ registeredAt: -1 });

    if (gender && gender !== 'all') {
      const normalizedGender = gender.toLowerCase();
      registrations = registrations.filter(
        (reg) => reg.gender?.toLowerCase() === normalizedGender
      );
    }

    if (minAge) {
      registrations = registrations.filter((reg) => reg.age >= Number(minAge));
    }

    if (maxAge) {
      registrations = registrations.filter((reg) => reg.age <= Number(maxAge));
    }

    if (status && status !== 'all') {
      registrations = registrations.filter((reg) => reg.status === status);
    }

    if (startDate) {
      const start = new Date(startDate);
      registrations = registrations.filter((reg) => new Date(reg.registeredAt) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      registrations = registrations.filter((reg) => new Date(reg.registeredAt) <= end);
    }

    const registrationsByEvent = registrations.reduce((acc, reg) => {
      const key = String(reg.event?._id || reg.event);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const totalCapacity = events.reduce((sum, event) => sum + (event.capacity || 0), 0);
    const totalRegistrations = registrations.length;
    const totalEvents = events.length;
    const averageRegistrationsPerEvent = totalEvents
      ? Number((totalRegistrations / totalEvents).toFixed(1))
      : 0;
    const capacityUtilization = totalCapacity
      ? Number(((totalRegistrations / totalCapacity) * 100).toFixed(1))
      : 0;

    const monthKeys = getLastSixMonthKeys();
    const monthCountMap = Object.fromEntries(monthKeys.map(({ key }) => [key, 0]));
    registrations.forEach((reg) => {
      const date = new Date(reg.registeredAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthCountMap[monthKey] !== undefined) {
        monthCountMap[monthKey] += 1;
      }
    });

    const registrationsByMonth = monthKeys.map(({ key, label }) => ({
      month: label,
      count: monthCountMap[key] || 0,
    }));

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
    };
    registrations.forEach((reg) => {
      ageDistribution[getAgeRange(reg.age)] += 1;
    });

    const eventPerformance = events.slice(0, 10).map((event) => {
      const registrationsCount = registrationsByEvent[String(event._id)] || 0;
      const utilizationPercentage = event.capacity > 0
        ? Number(((registrationsCount / event.capacity) * 100).toFixed(1))
        : 0;

      return {
        title: event.title.length > 20 ? `${event.title.slice(0, 20)}...` : event.title,
        capacity: event.capacity || 0,
        registrations: registrationsCount,
        utilizationPercentage,
      };
    });

    const topEvents = events
      .map((event) => {
        const registrationsCount = registrationsByEvent[String(event._id)] || 0;
        return {
          title: event.title,
          category: event.category,
          date: event.date,
          capacity: event.capacity || 0,
          registrations: registrationsCount,
          utilizationPercentage: event.capacity > 0
            ? Number(((registrationsCount / event.capacity) * 100).toFixed(1))
            : 0,
        };
      })
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      analytics: {
        summary: {
          totalEvents,
          totalRegistrations,
          averageAttendance: averageRegistrationsPerEvent,
          totalCapacity,
          capacityUtilization,
        },
        trends: {
          registrationsByMonth,
        },
        distributions: {
          gender: genderDistribution,
          age: ageDistribution,
        },
        eventPerformance,
        topEvents,
      },
    });
  } catch (error) {
    console.error('❌ Get analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
