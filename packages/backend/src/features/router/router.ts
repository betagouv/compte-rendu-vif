import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { onHmr } from "../../hmr";

export const makeRouter = async ({ port }: { port: number }) => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(port);

  onHmr(app.close);

  console.log(`Server running on http://localhost:${port}`);
};
