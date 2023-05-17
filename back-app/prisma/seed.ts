import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const wheel = await prisma.wheel.findFirst()

  if (!wheel) {
    await prisma.wheel.createMany({
      data: [
        {
          name: "Disco",
          valid: true
        },
        {
          name: "Raiada",
          valid: true
        }
      ]
    })
  }

  const cart_types = await prisma.cart_type.findFirst()

  if (!cart_types) {
    await prisma.cart_type.createMany({
      data: [
        {
          name: "LS",
          valid: true
        },
        {
          name: "Bitrezão",
          valid: true
        },
        {
          name: "Vanderleia",
          valid: true
        },
        {
          name: "Bitrem",
          valid: true
        },
        {
          name: "Rodotrem",
          valid: true
        },
      ]
    })
  }

  const cart_models = await prisma.cart_model.findFirst()

  if (!cart_models) {
    await prisma.cart_model.createMany({
      data: [
        {
          name: "Basculante",
          valid: true
        },
        {
          name: "Graneleiro",
          valid: true
        },
        {
          name: "Baú",
          valid: true
        },
        {
          name: "Sider",
          valid: true
        },
      ]
    })
  }

  const cart_brands = await prisma.brands.findFirst()

  if (!cart_brands) {
    await prisma.brands.createMany({
      data: [
        {
          name: "Facchini",
          valid: true
        },
        {
          name: "Ramon",
          valid: true
        },
        {
          name: "Noma",
          valid: true
        },
        {
          name: "Sider",
          valid: true
        },
      ]
    })
  }

  const states = await prisma.states.findFirst()

  if (!states) {
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
