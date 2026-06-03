const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  await prisma.userroles.deleteMany({ where: { role_id: 4 } });
  await prisma.roles.delete({ where: { id: 4 } });
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

  await prisma.roles.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      emertimi: "Manager",
      pershkrimi: "Menaxher i Dyqanit",
      normalized_name: "MANAGER",
    },
  });

  await prisma.roles.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      emertimi: "Staff",
      pershkrimi: "Staf Punonjes",
      normalized_name: "STAFF",
    },
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.users.upsert({
    where: { email: "rozafe.shkodra@gmail.com" },
    update: { password_hash: hashedPassword },
    create: {
      emri: "Rozafe",
      mbiemri: "Shkodra",
      email: "rozafe.shkodra@gmail.com",
      password_hash: hashedPassword,
      statusi: "Active",
      userroles: {
        create: { role_id: 1 },
      },
    },
  });

  await prisma.users.upsert({
    where: { email: "et72862@ubt-uni.net" },
    update: { password_hash: hashedPassword },
    create: {
      emri: "eda",
      mbiemri: "tahiri",
      email: "et72862@ubt-uni.net",
      password_hash: hashedPassword,
      statusi: "Active",
      userroles: {
        create: { role_id: 1 },
      },
    },
  });

  await prisma.users.upsert({
    where: { email: "manager@parfum.com" },
    update: { password_hash: hashedPassword },
    create: {
      emri: "Drita",
      mbiemri: "Rashiti",
      email: "manager@parfum.com",
      password_hash: hashedPassword,
      statusi: "Active",
      userroles: {
        create: { role_id: 3 },
      },
    },
  });

  await prisma.users.upsert({
    where: { email: "staff@parfum.com" },
    update: {},
    create: {
      emri: "Zana",
      mbiemri: "Tahiri",
      email: "staff@parfum.com",
      password_hash: hashedPassword,
      statusi: "Active",
      userroles: {
        create: { role_id: 2 },
      },
    },
  });

  // --- SHTESA E PUNËTORIT ---
  // --- SHTESA E PUNËTORIT ---
  const userStaff = await prisma.users.findUnique({ where: { email: "staff@parfum.com" } });
  
  if (userStaff) {
    // 1. Provo a ekziston ky punëtor
    const punetoriEkzistues = await prisma.punetoret.findFirst({
      where: { email: "staff@parfum.com" }
    });

    if (!punetoriEkzistues) {
      // 2. Nëse nuk ekziston, krijoje
      await prisma.punetoret.create({
        data: {
          emri: userStaff.emri,
          mbiemri: userStaff.mbiemri,
          email: "staff@parfum.com",
          pozita: "Staf",
          data_punesimit: new Date(),
          paga: 0
        },
      });
      console.log("Punëtori u krijua me sukses.");
    } else {
      console.log("Punëtori ekziston, duke anashkaluar krijimin.");
    }
  }
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

  // Parfumeve... (kodi yt vazhdon këtu me parfumet)
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

  // ... (pjesa tjetër e parfumeve mbetet e njëjtë)
  
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