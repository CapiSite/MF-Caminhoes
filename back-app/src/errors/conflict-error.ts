import { ErrorCase } from "@/protocols";

export function ConflictError(errors: string): ErrorCase {
  return{
    name: "ConflictError",
    message: errors
  }
}