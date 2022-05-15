import {ConfigModule} from "@nestjs/config";
import configuration from "../../constants/config/configuration";
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

/*
* http:
  host: 'localhost'
  port: 5000

https:
  host: 'localhost'
  port: 5001

db:
  mysql:
    url: '54.92.169.139'
    port: 3306
    database: 'flrbms'
    username: 'root'
    password: 'Capstone@2022'
    synchronize: false


keycloak:
  host: '54.92.169.139'
  port: 8080
  client:
    realm: 'authentication'
    id: 'authentication-api'
    secret: 'JgU0qklRFggfxhPtNY5wBM4IXSUxAfoY'

redis:
  host: '54.92.169.139'
  port: 6379
  username:
  password:

elasticsearch:
  host: '54.92.169.139'
  port: 9999

firebase:
  apiKey: "AIzaSyBu0hVHThHGd5OQLxQWnNZLSgdLGiYsfZE"
  authDomain: "fptu-library-booking.firebaseapp.com"
  projectId: "fptu-library-booking"
  storageBucket: "fptu-library-booking.appspot.com"
  messagingSenderId: "1013204251190"
  appId: "1:1013204251190:web:52aeef762a7eb980e51e97"
  measurementId: "G-MQLQ866QXQ"
  oauth:
    clientId: "fptu-library-booking"
    audience:
      - "fptu-library-booking"
      - "1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com"

* */
