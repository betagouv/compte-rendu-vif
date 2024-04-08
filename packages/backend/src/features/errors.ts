import { TRPCError } from "@trpc/server";

export class AppError {
  constructor(
    public status: number,
    public message: string,
  ) {}
}
