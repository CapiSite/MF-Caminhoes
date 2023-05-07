
import { createCart, deleteCart, deleteMyCart, editCart, getAllCarts, getMyCarts, getSpecificCart, validateCart } from "@/controllers";
import { authenticateAdmin, authenticateToken, uploadMain, uploadSecondary } from "@/middlewares";
import { Router } from "express";

const cartsRouter = Router()

cartsRouter
  //User Routes

  .get("/", getAllCarts)
  .get("/:cart_id", getSpecificCart)
  .get("/mine", authenticateToken, getMyCarts )
  .post("/", uploadMain.single("main"), createCart )
  .put("/:cart_id", authenticateToken, editCart )
  .delete("/mine/:cart_id", authenticateToken, deleteMyCart)

  //Admin Routes

  .post("/:cart_id/validate", authenticateAdmin, validateCart )
  .delete("/:cart_id", authenticateAdmin, deleteCart )


export { cartsRouter }