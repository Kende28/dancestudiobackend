import dotenv from 'dotenv';
import { PrismaClient } from 'generated/prisma/client';
import '@faker-js/faker';
import { faker } from '@faker-js/faker';
dotenv.config();

const prisma = new PrismaClient()

const main = async () => {
  for (let i = 0; i < 15; i++) {
    await prisma.applications.create({
      data: {
        course_id: faker.number.bigInt({
          min: 1,
          max: 10
        }),
        price: faker.number.int({
          min: 1000,
          max: 5000
        })
      }
    })
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
