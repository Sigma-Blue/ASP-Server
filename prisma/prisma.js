const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
   datasources: {
      db: {
         url: process.env.DATABASE_URL,
      },
   },
});

prisma
   .$connect()
   .then(() => {
      console.log('✅ Database connected successfully');
   })
   .catch((err) => {
      console.log('❌ Database connection failed');
      console.log(err);
   });

module.exports = prisma;
