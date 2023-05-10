-- CreateTable
CREATE TABLE "deleted_carts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "main_image" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "deleted_carts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deleted_carts" ADD CONSTRAINT "deleted_carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
