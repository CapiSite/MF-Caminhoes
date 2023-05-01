-- CreateTable
CREATE TABLE "cart_images" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "cart_id" INTEGER NOT NULL,

    CONSTRAINT "cart_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart_images" ADD CONSTRAINT "cart_images_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
