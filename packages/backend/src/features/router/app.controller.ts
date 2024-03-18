import { Controller, Get, Inject } from "@nestjs/common";
import type { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getHello() {
    console.log(this);
    return this.appService.getHello();
  }
}
