import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';  

export async function POST(request: Request) {
  try {
    const { name, clothes, userId } = await request.json();

    if (!name || !clothes || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Received data:", { name, clothes, userId });

    const outfit = await prisma.outfit.create({
      data: {
        name,
        userId: parseInt(userId, 10),
        clothes: {
          create: clothes.map((image: { id: number; positionX: number; positionY: number; rotation: number }) => ({
            clothesId: image.id,
            positionX: image.positionX,
            positionY: image.positionY,
            rotation: image.rotation,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Outfit saved successfully", outfit }, { status: 201 });
  } catch (error) {
    console.error("Error saving outfit:", error);
    return NextResponse.json({ error: "Failed to save outfit" }, { status: 500 });
  }
}
