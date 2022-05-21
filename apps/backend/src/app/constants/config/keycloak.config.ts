export const KEYCLOAK_CONFIG = {
  host: 'http://fu-lib-room.tk',
  port: '9090',
  client: {
    realm: 'authentication',
    id: 'authentication-api',
    secret: 'eAaFWFGhQbwR02U4g7M9xsd9BryRaeJ7',
  },
  grantType: {
    password: 'password',
    refreshToken: 'refresh_token',
  }
};
