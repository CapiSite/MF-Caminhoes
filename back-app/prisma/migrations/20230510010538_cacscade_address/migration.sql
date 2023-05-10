-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_address_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
