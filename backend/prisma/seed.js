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
      userRoles: {
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
      userRoles: {
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
      userRoles: {
        create: { role_id: 3 },
      },
    },
  });

  await prisma.users.upsert({
    where: { email: "staff@parfum.com" },
    update: { password_hash: hashedPassword },
    create: {
      emri: "Zana",
      mbiemri: "Tahiri",
      email: "staff@parfum.com",
      password_hash: hashedPassword,
      statusi: "Active",
      userRoles: {
        create: { role_id: 4 },
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

  await prisma.parfum.upsert({
    where: { parfum_id: 2 },
    update: {},
    create: {
      parfum_id: 2,
      emri: "Dior Sauvage",
      gjinia_target: "Meshkuj",
      volumi_ml: 100,
      cmimi: 120.0,
      sasia_stok: 15,
      pershkrimi:
        "Një aromë e egër dhe fisnike në të njëjtën kohë. Perfekte për mbrëmje.",
      notat_ere: "Bergamot, Piper i Zi, Dru Amber",
      kategoria_id: kategoria.kategori_id, // KORRIGJUAR: kategori_id
      marka_id: marka.marka_id,
    },
  });

  // 3. Versace Eros
  await prisma.parfum.upsert({
    where: { parfum_id: 3 },
    update: {},
    create: {
      parfum_id: 3,
      emri: "Versace Eros",
      gjinia_target: "Meshkuj",
      volumi_ml: 100,
      cmimi: 95.0,
      sasia_stok: 20,
      pershkrimi: "Aroma e dashurisë, pasionit dhe bukurisë mashkullore.",
      notat_ere: "Mente, Mollë e Gjelbër, Tonka Bean",
      kategoria_id: kategoria.kategori_id, // KORRIGJUAR: kategori_id
      marka_id: marka.marka_id,
    },
  });

  await prisma.parfum.upsert({
    where: { parfum_id: 4 },
    update: {},
    create: {
      parfum_id: 4,
      emri: "Tom Ford Black Orchid",
      gjinia_target: "Unisex",
      volumi_ml: 50,
      cmimi: 150.0,
      sasia_stok: 8,
      pershkrimi:
        "Një aromë luksoze, e errët dhe misterioze me nota të pasura dhe sensuale.",
      notat_ere: "Black Truffle, Ylang-Ylang, Black Orchid, Patchouli",
      kategoria_id: kategoria.kategori_id,
      marka_id: marka.marka_id,
    },
  });

  await prisma.parfum.upsert({
    where: { parfum_id: 5 },
    update: {},
    create: {
      parfum_id: 5,
      emri: "Férox",
      gjinia_target: "Femer",
      volumi_ml: 100,
      cmimi: 145.0,
      sasia_stok: 10,
      pershkrimi: "Layers of Scent Unfolding Like a Story.",
      notat_ere: "Jasmine, Rose, Green tea, Vanilla, Sandalwood, Musk",
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
