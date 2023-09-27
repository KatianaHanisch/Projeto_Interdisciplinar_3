const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const role = await prisma.roles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "admin",
    },
  });

  const user = await prisma.usersDashboard.upsert({
    where: { email: "admin@admin" },
    update: {},
    create: {
      email: "admin@admin",
      name: "Admin",
      password: "$2a$12$GTSz2ULXhjfMmWdFONWBG.ZKVMdih5xoBiaRC5yPlF0dkB572QAOi",
      role_id: role.id,
    },
  });
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
