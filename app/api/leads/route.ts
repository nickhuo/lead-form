import { NextResponse } from 'next/server';
import { Lead, LeadStatus } from '@/app/types';

// In-memory storage for leads (replace with your database)
let leads: Lead[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newLead: Lead = {
      id: Date.now().toString(), // Replace with proper UUID in production
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      countryOfCitizenship: data.countryOfCitizenship,
      linkedin: data.linkedin,
      resumeUrl: '', // TODO: Implement file storage
      visaInterest: data.visaInterest,
      message: data.message,
      status: 'PENDING' as LeadStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leads.push(newLead);

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(leads);
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    const lead = leads.find(l => l.id === id);
    
    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    lead.status = status;
    lead.updatedAt = new Date().toISOString();

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
} 