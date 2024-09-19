import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Get the JSON body from the request

    const response = await fetch('https://uptions.adaptable.app/api/v1/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error occurred' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Successfully added to the waitlist!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
