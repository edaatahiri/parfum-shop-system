const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  console.log('Duke nisur procesin e "seeding"...');

  await prisma.roles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      emertimi: "Admin",
      pershkrimi: "Administrator i Sistemit",
      normalized_name: "ADMIN",
    },
  });

  await prisma.roles.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      emertimi: "User",
      pershkrimi: "Perdorues i thjeshte",
      normalized_name: "USER",
    },
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.users.upsert({
    where: { email: "rozafe.shkodra@gmail.com" },
    update: {password_hash: hashedPassword},
    create: {
      emri: "Rozafe",
      mbiemri: "Shkodra",
      email: "rozafe.shkodra@gmail.com",
      password_hash: hashedPassword,
      statusi: "Active",
      userRoles: {
        create: { role_id: 1 },
      },
    },
  });

  await prisma.users.upsert({
    where: { email: "et72862@ubt-uni.net" },
    update: { password_hash: hashedPassword},
    create: {
      emri: "eda",
      mbiemri: "tahiri",
      email: "et72862@ubt-uni.net",
      password_hash: hashedPassword,
      statusi: "Active",
      userRoles: {
        create: { role_id: 1 },
      },
    },
  });

  const kategoria = await prisma.kategoria.upsert({
    where: { emri: "Floral" },
    update: {},
    create: {
      emri: "Floral",
      pershkrimi: "Parfume me nota lulesh",
    },
  });

  const marka = await prisma.markat.upsert({
    where: { emri: "Channel" },
    update: {},
    create: {
      emri: "Channel",
      shteti_origjines: "France",
      website: "www.chanel.com",
    },
  });

  await prisma.parfum.upsert({
    where: { parfum_id: 1 },
    update: {},
    create: {
      parfum_id: 1,
      emri: "Channel No. 5",
      gjinia_target: "Femer",
      volumi_ml: 100,
      cmimi: 125.5,
      sasia_stok: 15,
      pershkrimi: "Një parfum legjendar me nota lulesh.",
      notat_ere: "Aldehydes, Jasmine, Rose",
      kategoria_id: kategoria.kategori_id,
      marka_id: marka.marka_id,
    },
  });

  console.log("Seeding përfundoi me sukses!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
