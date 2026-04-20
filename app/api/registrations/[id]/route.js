import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/config/db';
import Registration from '../../../../lib/models/RegistrationModel';
import Event from '../../../../lib/models/EventModel';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const body = await request.json();
    const updateData = {};

    if (typeof body.checkedIn === 'boolean') {
      updateData.checkedIn = body.checkedIn;
      updateData.checkedInAt = body.checkedIn ? new Date() : null;
    }

    if (body.status) {
      const allowedStatuses = ['confirmed', 'cancelled', 'waitlist'];
      if (!allowedStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: 'Invalid registration status' },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update' },
        { status: 400 }
      );
    }

    const updated = await Registration.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('event', 'title date startTime location category capacity registeredAttendees');

    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration updated successfully',
      registration: updated,
    });
  } catch (error) {
    console.error('❌ Update registration error:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const existing = await Registration.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    const eventId = existing.event;
    await Registration.findByIdAndDelete(id);

    if (eventId) {
      await Event.updateRegistrationCount(eventId);
    }

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete registration error:', error);
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}
