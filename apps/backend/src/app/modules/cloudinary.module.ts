import { Module } from "@nestjs/common";
import { CloudinaryService } from "../services/cloudinary.service";
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
