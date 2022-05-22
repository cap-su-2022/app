export const Environment = {
  http: {
    host: 'http.host',
    port: 'http.port',
  },
  https: {
    host: 'https.host',
    port: 'https.port',
  },
  db: {
    mysql: {
      url: 'db.mysql.url',
      port: 'db.mysql.port',
      database: 'db.mysql.database',
      username: 'db.mysql.username',
      password: 'db.mysql.password',
      synchronize: 'db.mysql.synchronize',
    },
    keycloak: {
      url: 'db.keycloak.url',
      port: 'db.keycloak.port',
      database: 'db.keycloak.database',
      username: 'db.keycloak.username',
      password: 'db.keycloak.password',
      synchronize: 'db.keycloak.synchronize',
    },
  },
  keycloak: {
    host: 'keycloak.host',
    port: 'keycloak.port',
    client: {
      realm: 'keycloak.client.realm',
      id: 'keycloak.client.id',
      secret: 'keycloak.client.secret',
    },
    grant_type: {
      password: 'keycloak.grant_type.password',
    },
    master_username: 'keycloak.master_username',
    master_password: 'keycloak.master_password'
  },
  redis: {
    host: 'redis.host',
    port: 'redis.port',
    username: 'redis.username',
    password: 'redis.password',
  },
  elasticsearch: {
    host: 'elasticsearch.host',
    port: 'elasticsearch.port',
  },
  firebase: {
    apiKey: 'firebase.apiKey',
    authDomain: 'firebase.authDomain',
    projectId: 'firebase.projectId',
    storageBucket: 'firebase.storageBucket',
    messagingSenderId: 'firebase.messagingSenderId',
    appId: 'firebase.appId',
    measurementId: 'firebase.measurementId',
  },
};
