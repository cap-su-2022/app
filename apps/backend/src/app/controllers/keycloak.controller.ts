import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, Res} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiSecurity} from "@nestjs/swagger";
import {KEYCLOAK_PATH} from "../constants/controllers/keycloak/path.constant";
import {AUTHORIZATION_LOWERCASE} from "../constants/network/headers.constant";
import {AuthService} from "../services/auth.service";
import {Response} from "express";
import {KeycloakSigninSuccessResponse} from "../dto/keycloak-signin-success.response.dto";
import {AuthenticationService} from "../services/authentication.service";
import {UsernamePasswordCredentials, UsernamePasswordLoginResponse} from "@app/models";
import {Roles} from "../enum/roles.enum";

export class AuthenticationRequest {
  @ApiProperty({
    example: "admin"
  })
  username?: string;
  password?: string;
}

@ApiBearerAuth()
@Controller(KEYCLOAK_PATH.requestPath)
export class KeycloakController {

  constructor(private readonly service: KeycloakService,
              private readonly authService: AuthService,
              private readonly authenticationService: AuthenticationService) {
  }

  @ApiOperation({})
  @ApiBody({
    required: true,
    description: "Contains the username and password value.",
    type: AuthenticationRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post(KEYCLOAK_PATH.signIn)
  @ApiBody({
    schema: {
      type: 'object',
    }
  })
  async signIn(@Res({passthrough: true}) httpResponse: Response,
               @Body() account: { username: string, password: string }): Promise<Partial<UsernamePasswordLoginResponse>> {
    const resp = await this.authenticationService.handleUsernamePasswordLogin(account);
    httpResponse.setHeader('Authorization', resp.accessToken);
    httpResponse.setHeader('AuthorizationRefreshToken', resp.refreshToken);
    httpResponse.cookie('refreshToken', resp.refreshToken);
    httpResponse.cookie('accessToken', resp.accessToken);
    return {
      email: resp.email,
      id: resp.id,
      googleId: resp.googleId,
      phone: resp.phone,
      username: resp.username,
      keycloakId: resp.keycloakId,
      role: Roles.APP_ADMIN,
      fullname: resp.fullname
    };
  }

  @Post('signin/google')
  signInWithGoogle(@Body() request: { token: string }) {
    return this.authService.handleGoogleSigninWithIdToken(request.token);
  }

  @Post(KEYCLOAK_PATH.refreshAccessToken)
  refreshAccessToken(@Body() accessToken) {
    return this.service.refreshAccessToken(accessToken);
  }

  @Post(KEYCLOAK_PATH.signOut)
  signOut(@Request() req: Request, @Param("id") id: string) {
    return this.service.signOutKeycloakUser(req.headers[AUTHORIZATION_LOWERCASE], id);
  }

  @Get(KEYCLOAK_PATH.countUsers)
  countUsers(@Request() request: Request) {
    return this.service.countUsers(request.headers[AUTHORIZATION_LOWERCASE]);
  }

  @Get(KEYCLOAK_PATH.getUsers)
  getAllKeycloakUsers(@Request() req: Request) {
    return this.service.getAllUsers(req.headers[AUTHORIZATION_LOWERCASE]);
  }

  @Get(KEYCLOAK_PATH.getUserById)
  @ApiParam({
    name: 'id',
    description: "The ID of the existed keycloak user",
    type: String,
    required: true,
    example: 'ABCD1234',
  })
  getKeycloakUserById(@Request() req: Request, @Param("id") id: string) {
    return this.service.getUserById(req.headers[AUTHORIZATION_LOWERCASE], id);
  }

  @Post(KEYCLOAK_PATH.createNewUser)
  createUser(@Body() user, @Request() req: Request) {
    return this.service.createKeycloakUser(req.headers[AUTHORIZATION_LOWERCASE], user);
  }

  @Put(KEYCLOAK_PATH.refreshUserPasswordById)
  @ApiParam({
    name: 'id',
    description: "The ID of the existed keycloak user",
    type: String,
    required: true,
    example: 'ABCD1234',
  })
  resetKeycloakUserPassword(@Request() req: Request, @Param("id") id, @Body() password) {
    return this.service.resetKeycloakUserById(req, id, password.rawPasswword);
  }
}
