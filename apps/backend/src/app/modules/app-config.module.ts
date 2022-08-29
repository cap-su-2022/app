import {Module} from "@nestjs/common";
import {GlobalConfigController} from "../controllers/global-config.controller";
import GlobalConfigModule from "./global/config.module";

@Module({
  controllers: [GlobalConfigController],
  exports: [],
  imports: [GlobalConfigModule],
  providers: []
})
export class AppConfigModule {

}
