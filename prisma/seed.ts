import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function up() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      fullName: "Alice Johnson",
      email: "alice@example.com",
      password: "password123", // You should hash passwords in a real app
      clothes: {
        create: [
          {
            name: "Red T-Shirt",
            imageUrl: "https://example.com/images/red-tshirt.png",
            type: "T-Shirt",
            color: "Red",
            season: "Summer",
            material: "Cotton",
          },
          {
            name: "Blue Jeans",
            imageUrl: "https://example.com/images/blue-jeans.png",
            type: "Jeans",
            color: "Blue",
            season: "All",
            material: "Denim",
          },
        ],
      },
      outfits: {
      }
    },
  });

  const user2 = await prisma.user.create({
    data: {
      fullName: "Bob Smith",
      email: "bob@example.com",
      password: "password456", // You should hash passwords in a real app
      clothes: {
        create: [
          {
            name: "Black Jacket",
            imageUrl: "https://example.com/images/black-jacket.png",
            type: "Jacket",
            color: "Black",
            season: "Winter",
            material: "Leather",
          },
          {
            name: "White Sneakers",
            imageUrl: "https://example.com/images/white-sneakers.png",
            type: "Sneakers",
            color: "White",
            season: "All",
            material: "Canvas",
          },
        ],
      },
      outfits: {
        
      },
    },
  });

  console.log("Seeding finished.");
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Clothes" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Outfit" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "OutfitClothes" RESTART IDENTITY CASCADE`;
  }

  async function main() {
    try {
      await down();
      await up();
    } catch (e) {
      console.error(e);
    }
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
