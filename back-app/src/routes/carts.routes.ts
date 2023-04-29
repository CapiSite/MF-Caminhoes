
import { authenticateAdmin, authenticateToken } from "@/middlewares";
import { Router } from "express";

const cartsRouter = Router()

cartsRouter
  //User Routes

  .get("/", )
  .get("/:cart_id", )
  .get("/mine", authenticateToken, )
  .post("/", authenticateToken,  )
  .put("/:cart_id", authenticateToken, )

  //Admin Routes

  .post("/:cart_id/validate", authenticateAdmin,  )
  .delete("/:cart_id", authenticateAdmin, )


export { cartsRouter }