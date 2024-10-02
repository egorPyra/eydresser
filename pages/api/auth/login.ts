import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Log the incoming request for debugging
            console.log("Received login request for email:", email);

            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Check if the user exists in the database
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid login credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid login credentials' });
            }

            // Exclude password from the response data
            const { password: _, ...userWithoutPassword } = user;

            // Return the user data (without password)
            return res.status(200).json({ user: userWithoutPassword });

        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
