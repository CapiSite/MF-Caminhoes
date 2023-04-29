import { ErrorCase } from "@/protocols";

export function InvalidBodyError(errors: string[]): ErrorCase {
  return{
    name: "InvalidBodyError",
    message: errors
  }
}