import {ConfigModule} from "@nestjs/config";
import configuration from "../constants/config/configuration";
import * as Joi from "joi";

const GlobalConfigModule = ConfigModule.forRoot({
  load: [configuration],
  validationSchema: Joi.object({
    'db.mysql.url': Joi.string().ip({version: 'ipv4'}),
    'db.mysql.port': Joi.string().default(3306),
    'db.mysql.username': Joi.string().min(1).max(100),
    'db.mysql.password': Joi.string().min(1).max(255),
    'db.mysql.database': Joi.string().min(1).max(255),
    'db.mysql.synchronize': Joi.boolean(),
  })
});

export default GlobalConfigModule;
