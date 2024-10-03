// pages/api/outfits/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma-client'; // Подключение Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, userId, clothes } = req.body;

    try {
      const outfit = await prisma.outfit.create({
        data: {
          name,
          userId,
          clothes: {
            create: clothes.map((item: { src: string; alt: string; position: { x: number; y: number }; rotationAngle: number }) => ({
              clothes: {
                create: {
                  name: item.alt,
                  imageUrl: item.src,
                },
              },
            })),
          },
        },
      });

      res.status(200).json(outfit);
    } catch (error) {
      console.error("Failed to save outfit:", error);
      res.status(500).json({ error: 'Failed to save outfit' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

