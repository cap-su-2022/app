import {ConfigModule} from "@nestjs/config";
import configuration from "../../constant/configuration";
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
    'http.host': Joi.string(),
    'http.port': Joi.number(),
    'https.host': Joi.string(),
    'https.port': Joi.number(),
    'keycloak.host': Joi.string().ip({version: 'ipv4'}),
    'keycloak.port': Joi.number(),
    'keycloak.client.realm': Joi.string().min(1).max(255),
    'keycloak.client.id': Joi.string().min(1).max(255),
    'keycloak.client.secret': Joi.string().min(1).max(1000),
    'redis.host': Joi.string().ip({version: 'ipv4'}),
    'redis.port': Joi.number(),
    'redis.username': Joi.string().min(0).max(100),
    'redis.password': Joi.string().min(0).max(255),
    'elasticsearch.username': Joi.string().min(0).max(100),
    'elasticsearch.password': Joi.string().min(0).max(100),
    'firebase.apiKey': Joi.string(),
    'firebase.authDomain': Joi.string(),
    'firebase.projectId': Joi.string(),
    'firebase.storageBucket': Joi.string(),
    'firebase.messagingSenderId': Joi.string(),
    'firebase.appId': Joi.string(),
    'firebase.measurementId': Joi.string(),
    'firebase.oauth.clientId': Joi.string(),
    'firebase.oauth.audience': Joi.array(),
  })
});

export default GlobalConfigModule;
