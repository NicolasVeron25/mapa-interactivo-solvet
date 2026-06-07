const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allAsentamientos = await prisma.asentamientos.findMany();
  console.log("Datos encontrados en la base de datos:", allAsentamientos);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());