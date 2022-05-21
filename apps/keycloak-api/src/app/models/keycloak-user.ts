export interface KeycloakUser {
  keycloakId: string;
  fullname: string;
  role: string;
  email: string;
  emailVerified: boolean;
  isEnabled: boolean;
  createdAt: number;
}
