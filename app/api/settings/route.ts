import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/prisma-client';

export async function POST(request: Request) {
    try {
      const { name, email, password, userId } = await request.json();
  
      // Check if required fields are provided
      if (!name || !email || !password || !userId) {
        return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
      }
  
      // Ensure the user exists before updating
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) }
      });
  
      if (!existingUser) {
        return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
      }
  
      // Proceed with updating the user
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: {
          fullName: name,
          email: email,
          password: password, 
        },
      });
  
      return NextResponse.json({ message: "Данные пользователя были успешно обновлены!", updatedUser }, { status: 200 });
    } catch (error) {
      console.error("Произошла ошибка при обновлении:", error);
      return NextResponse.json({ error: "Произошла ошибка при обновлении" }, { status: 500 });
    }
  }