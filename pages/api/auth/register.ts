import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullName, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user in the database
            const newUser = await prisma.user.create({
                data: {
                    fullName,
                    email,
                    password: hashedPassword,  // Store hashed password
                },
            });

            // Don't return the password to the client
            const { password: _, ...userWithoutPassword } = newUser;

            return res.status(201).json({ user: userWithoutPassword });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
