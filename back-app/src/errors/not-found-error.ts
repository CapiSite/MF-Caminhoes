import { ErrorCase } from "@/protocols";

export function NotFoundError(error: string): ErrorCase {
  return{
    name: "NotFoundError",
    message: error
  }
}