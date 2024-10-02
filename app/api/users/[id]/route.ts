import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client'; // Ensure this path is correct for your prisma setup

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    // Fetch user data from the database using Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clothes: true, // Adjust these based on your database schema
        outfits: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Respond with user data
    return NextResponse.json({
      fullName: user.fullName,
      clothesCount: user.clothes.length,
      outfitsCount: user.outfits.length,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
