import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "This is a placeholder for the GET request" }, { status: 200 });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "This is a placeholder for the POST request" }, { status: 200 });
}
