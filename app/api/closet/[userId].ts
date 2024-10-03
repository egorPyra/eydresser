// pages/api/closet/[userId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const clothes = await prisma.clothes.findMany({
      where: {
        userId: Number(userId),
      },
    });
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clothes" });
  }
}
