import { NextResponse } from 'next/server';
import { Lead } from '@/app/types';

// Mock database (should be shared with the main leads route)
let leads: Lead[] = [];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const lead = leads.find((l) => l.id === params.id);

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  lead.status = data.status;
  return NextResponse.json(lead);
} 