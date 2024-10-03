// import { NextResponse } from 'next/server';
// import { prisma } from '../../../../prisma/prisma-client';  

// export async function POST(request: Request) {
//   try {
//     const { name, images, userId } = await request.json();

//     if (!name || !images || !userId) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const outfit = await prisma.outfit.create({
//       data: {
//         name,
//         userId: parseInt(userId, 10),
//         clothes: {
//           create: images.map((image: { src: string; alt: string; positionX: number; positionY: number; rotation: number }) => ({
//             imageUrl: image.src,
//             name: image.alt,
//             positionX: image.positionX,
//             positionY: image.positionY,
//             rotation: image.rotation,
//           })),
//         },
//       },
//     });

//     return NextResponse.json({ message: "Outfit saved successfully", outfit }, { status: 201 });
//   } catch (error) {
//     console.error("Error saving outfit:", error);
//     return NextResponse.json({ error: "Failed to save outfit" }, { status: 500 });
//   }
// }
