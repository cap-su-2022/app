import {AccountsModule} from "./accounts.module";
import {TypeOrmExModule} from "./global/typeorm-ex.module";
import {HolidaysRepository} from "../repositories";
import {HolidaysService, KeycloakService} from "../services";
import {HolidaysController} from "../controllers";
import {forwardRef, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

@Module(  {
  imports:[
    ConfigModule,
    HttpModule,
    forwardRef(() => AccountsModule),
    TypeOrmExModule.forCustomRepository([HolidaysRepository]),
  ],
  providers: [HolidaysService, KeycloakService],
  exports: [HolidaysService],
  controllers: [HolidaysController],
})
export class HolidaysModule {}
