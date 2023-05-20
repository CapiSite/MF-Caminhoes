import express, { Express } from 'express'
import { connectDb, disconnectDB, loadEnv } from './config'
import cors from 'cors';
import { adminRouter } from './routes/admin.routes';
import { usersRouter } from './routes/users.routes';
import { cartsRouter } from './routes/carts.routes';
import { typesRouter } from './routes/types.routes';
import { imagesRouter } from './routes/images.routes';
import { infoRouter } from './routes/info.routes';

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/images", imagesRouter)
  .use("/admin", adminRouter)
  .use("/users", usersRouter)
  .use("/carts", cartsRouter)
  .use("/types", typesRouter)
  .use("/info", infoRouter)

export async function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;