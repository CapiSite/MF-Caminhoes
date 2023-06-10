import { Request, Response } from "express";
import { addViewInCart, confirmSawAllDeletedCarts, createCart, deleteCart, deleteMyCart, editCart, getAllCarts, getMostViewedCarts, getMyCarts, getSpecificCart, getUnvalidCarts, validateCart } from "../controllers";
import { authenticateAdmin, authenticateToken, uploadMain, uploadSecondary, validateBody } from "../middlewares";
import { cartPost, cartUpdate } from "../models/cart.models";
import { Router } from "express";
import httpStatus from "http-status";
import path from "path";

const cartsRouter = Router()

cartsRouter
  //User Routes

  .get("/", getAllCarts)
  .get("/all-carts/:cart_id", getSpecificCart)
  .get("/most-views", getMostViewedCarts)
  .post("/add-view/:cart_id", addViewInCart)

  //authenticated ones

  .get("/my-carts", authenticateToken, getMyCarts)
  .post("/photos/main", authenticateToken, uploadMain.single("main"), (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send({ main: req.body.main_photo })
  })
  .post("/photos/secondary", authenticateToken, uploadSecondary.array("secondary"), (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send({ secondary: req.body.secondary })
  })
  .post("/", authenticateToken, validateBody(cartPost), createCart)
  .put("/:cart_id", authenticateToken, validateBody(cartUpdate),  editCart)
  .delete("/mine/:cart_id", authenticateToken, deleteMyCart)
  .delete("/refused/mine", authenticateToken, confirmSawAllDeletedCarts)

  //Admin Routes

  .get("/unvalid", authenticateAdmin, getUnvalidCarts)
  .post("/:cart_id/validate", authenticateAdmin, validateCart)
  .delete("/:cart_id", authenticateAdmin, deleteCart)


export { cartsRouter }