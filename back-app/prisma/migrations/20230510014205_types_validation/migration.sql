-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "valid" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "cart_model" ADD COLUMN     "valid" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "cart_type" ADD COLUMN     "valid" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "wheel" ADD COLUMN     "valid" BOOLEAN DEFAULT false;
