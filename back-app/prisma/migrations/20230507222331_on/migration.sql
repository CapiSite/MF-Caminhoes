-- DropForeignKey
ALTER TABLE "cart_images" DROP CONSTRAINT "cart_images_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "cart_images" ADD CONSTRAINT "cart_images_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
