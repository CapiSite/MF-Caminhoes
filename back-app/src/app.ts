import express, { Express } from 'express'
import { connectDb, disconnectDB, loadEnv } from './config'
import cors from 'cors';
import { adminRouter } from './routes/admin.routes';
import { usersRouter } from './routes/users.routes';
import { cartsRouter } from './routes/carts.routes';
import { typesRouter } from './routes/types.routes';
import multer from 'multer';
import bodyParser from 'body-parser';

loadEnv();

const app = express();
const uploadUser = multer()

app
  .use(cors())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/admin", adminRouter)
  .use("/users", usersRouter)
  .use("/carts", cartsRouter)
  .use("/types", typesRouter )

export async function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;