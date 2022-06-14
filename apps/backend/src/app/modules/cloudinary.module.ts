import { Module } from "@nestjs/common";
import { CloudinaryService } from "../services";
import ConfigModule from "./global/config.module";

@Module({
  imports: [
    ConfigModule
  ],
  exports: [CloudinaryService],
  providers: [CloudinaryService]
})
export class CloudinaryModule {
}
