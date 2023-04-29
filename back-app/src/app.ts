import express, { Express } from 'express'
import { connectDb, disconnectDB, loadEnv } from '@/config'
import cors from 'cors';

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))

export async function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;