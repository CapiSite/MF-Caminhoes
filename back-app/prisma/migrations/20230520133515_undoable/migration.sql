-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "undeletable" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "cart_model" ADD COLUMN     "undeletable" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "cart_type" ADD COLUMN     "undeletable" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "wheel" ADD COLUMN     "undeletable" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "visitant_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" CHAR(11) NOT NULL,

    CONSTRAINT "visitant_info_pkey" PRIMARY KEY ("id")
);
