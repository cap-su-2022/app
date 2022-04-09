export const KEYCLOAK_CONFIG = {
  host: 'http://54.92.169.139',
  port: '8080',
  client: {
    realm: 'authentication',
    id: 'authentication-api',
    secret: 'JgU0qklRFggfxhPtNY5wBM4IXSUxAfoY',
  },
  grantType: {
    password: 'password',
    refreshToken: 'refresh_token',
  }
};
