import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, source } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Basic phone validation (US format)
    const phoneRegex = /^[\+]?[1]?[\s\-\.\(\)]?[\d\s\-\.\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Create lead object
    const lead = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.toLowerCase().trim(),
      source: source || 'Unknown',
      timestamp: new Date().toISOString(),
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // TODO: Save to database
    // For now, we'll just log it and return success
    console.log('New lead received:', lead);

    // In production, you would save to your database here
    // Example with Supabase:
    // const { data, error } = await supabase
    //   .from('leads')
    //   .insert([lead]);
    
    // if (error) {
    //   console.error('Database error:', error);
    //   return NextResponse.json(
    //     { error: 'Failed to save lead' },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully',
        leadId: lead.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}