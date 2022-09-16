import {Module} from "@nestjs/common";
import {GlobalConfigController} from "../controllers/global-config.controller";

@Module({
  controllers: [GlobalConfigController],
  exports: [],
  imports: [],
  providers: []
})
export class AppConfigModule {

}
