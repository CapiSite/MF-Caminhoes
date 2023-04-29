import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const wheel = await prisma.wheel.findFirst()

  if (!wheel) {
    await prisma.wheel.createMany({
      data: [
        { name: "Disco" },
        { name: "Raiada"}
      ]
    })
  }

  const cart_types = await prisma.cart_type.findFirst()

  if (!cart_types) {
    await prisma.cart_type.createMany({
      data: [
        {
          name: "LS"
        },
        {
          name: "Bitrezão"
        },
        {
          name: "Vanderleia"
        },
        {
          name: "Bitrem"
        },
        {
          name: "Rodotrem"
        },
      ]
    })
  }

  const cart_models = await prisma.cart_type.findFirst()

  if (!cart_models) {
    await prisma.cart_model.createMany({
      data: [
        {
          name: "Basculante"
        },
        {
          name: "Graneleiro"
        },
        {
          name: "Baú"
        },
        {
          name: "Sider"
        },
      ]
    })
  }

  const cart_brands = await prisma.brands.findFirst()

  if (!cart_brands) {
    await prisma.brands.createMany({
      data: [
        {
          name: "Facchini"
        },
        {
          name: "Ramon"
        },
        {
          name: "Noma"
        },
        {
          name: "Sider"
        },
      ]
    })
  }

  const states = await prisma.states.findFirst()

  if(!states) {
    await prisma.states.createMany({
      data: [
        {
          name: "AC"
        },
        {
          name: "AL"
        },
        {
          name: "AM"
        },
        {
          name: "AP"
        },
        {
          name: "BA"
        },
        {
          name: "CE"
        },
        {
          name: "DF"
        },
        {
          name: "ES"
        },
        {
          name: "GO"
        },
        {
          name: "MA"
        },
        {
          name: "MT"
        },
        {
          name: "MS"
        },
        {
          name: "MG"
        },
        {
          name: "PA"
        },
        {
          name: "PB"
        },
        {
          name: "PR"
        },
        {
          name: "PE"
        },
        {
          name: "PI"
        },
        {
          name: "RJ"
        },
        {
          name: "RN"
        },
        {
          name: "RS"
        },
        {
          name: "RO"
        },
        {
          name: "RR"
        },
        {
          name: "SC"
        },
        {
          name: "SP"
        },
        {
          name: "SE"
        },
        {
          name: "TO"
        },
      ]
    })
  }
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
