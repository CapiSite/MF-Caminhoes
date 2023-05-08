import { Request, Response } from "express";
import { createCart, deleteCart, deleteMyCart, editCart, getAllCarts, getMyCarts, getSpecificCart, getUnvalidCarts, validateCart } from "@/controllers";
import { authenticateAdmin, authenticateToken, uploadMain, uploadSecondary, validateBody } from "@/middlewares";
import { cartPost } from "@/models/cart.models";
import { Router } from "express";
import httpStatus from "http-status";

const cartsRouter = Router()

cartsRouter
  //User Routes

  .get("/", getAllCarts)
  .get("/:cart_id", getSpecificCart)
  .get("/mine", authenticateToken, getMyCarts)

  .post("/photos/main", authenticateToken, uploadMain.single("main"), (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send({ main: req.body.main_photo })
  })
  .post("/photos/secondary", authenticateToken, uploadSecondary.array("secondary"), (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send({ secondary: req.body.secondary })
  })
  .post("/", authenticateToken, validateBody(cartPost), createCart)

  .put("/:cart_id", authenticateToken, editCart)
  .delete("/mine/:cart_id", authenticateToken, deleteMyCart)

  //Admin Routes

  .get("/unvalid", authenticateAdmin, getUnvalidCarts)
  .post("/:cart_id/validate", authenticateAdmin, validateCart)
  .delete("/:cart_id", authenticateAdmin, deleteCart)


export { cartsRouter }