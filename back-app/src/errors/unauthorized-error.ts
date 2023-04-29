import { ErrorCase } from "@/protocols";

export function UnauthorizedError(errors: string): ErrorCase {
  return{
    name: "UnauthorizedError",
    message: errors
  }
}