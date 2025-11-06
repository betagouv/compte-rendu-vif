export class AppError {
  constructor(
    public status: number,
    public message: string,
  ) {}
}
