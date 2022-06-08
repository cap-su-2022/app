import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res, UseInterceptors
} from "@nestjs/common";
import { KeycloakService } from "../services/keycloak.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { KEYCLOAK_PATH } from "../constants/controllers/keycloak/path.constant";
import { AUTHORIZATION_LOWERCASE } from "../constants/network/headers.constant";
import { Response } from "express";
import { AuthenticationService } from "../services/authentication.service";
import { UsernamePasswordLoginResponse } from "@app/models";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { AccessTokenResponsePayload } from "../payload/response/refresh_token.response.payload";
import { RefreshTokenPayload } from "../payload/response/refresh-token.request.payload";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

export class AuthenticationRequest {
  @ApiProperty({
    example: "admin"
  })
  username?: string;
  password?: string;
}

class GoogleIDTokenRequest {
  @ApiProperty({
    example: "example-id-token-as-jwt",
    type: String,
    required: true,
    description: "JWT ID Token given by Google Authentication Provider",
    name: "token",
    title: "Google ID Token"
  })
  token: string;
}


@ApiBearerAuth()
@Controller(KEYCLOAK_PATH.requestPath)
@ApiTags("Authentication")
@UseInterceptors(new PathLoggerInterceptor(AuthenticationController.name))
export class AuthenticationController {

  constructor(private readonly service: KeycloakService,
              private readonly authenticationService: AuthenticationService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post("info")
  async validateTokenAndGetUserInfo(@Body() payload: { token: string }) {
    if (Object.keys(payload).length < 1) {
      throw new BadRequestException("Must provide access token");
    }
    return this.service.getUserInfo(payload.token);
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
      role: resp.role,
      fullname: resp.fullname,
      avatar: resp.avatar
    };
  }

  @Post("signin/google")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Login into system using Google ID Token",
    description: "Use Google ID Token to login into the system then return the user instance with access token and refresh token"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully logged into the system"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid Google ID Token credentials"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "User"
  })
  async signInWithGoogle(@Res({ passthrough: true }) httpResponse: Response,
                         @Body() request: GoogleIDTokenRequest) {
    const resp = await this.authenticationService.handleGoogleSignin(request.token);
    httpResponse.setHeader("Authorization", resp.accessToken);
    httpResponse.setHeader("AuthorizationRefreshToken", resp.refreshToken);
    httpResponse.cookie("refreshToken", resp.refreshToken);
    httpResponse.cookie("accessToken", resp.accessToken);
    return {
      email: resp.email,
      id: resp.id,
      googleId: resp.googleId,
      phone: resp.phone,
      username: resp.username,
      keycloakId: resp.keycloakId,
      role: resp.role,
      fullname: resp.fullname
    };
  }

  @Post(KEYCLOAK_PATH.refreshAccessToken)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Refresh access token using provided refresh token",
    description: "Provide new access token and new refresh token by using provided refresh token"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully provides new access and refresh token"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Failed to validate provided refresh token"
  })
  async refreshAccessToken(@Res({ passthrough: true }) res: Response,
                           @Body() payload: RefreshTokenPayload): Promise<AccessTokenResponsePayload> {
    const response = await this.service.refreshAccessToken(payload);
    res.cookie("accessToken", response.accessToken);
    res.cookie("refreshToken", response.refreshToken);
    return response;
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
    name: "id",
    description: "The ID of the existed keycloak user",
    type: String,
    required: true,
    example: "ABCD1234"
  })
  @Roles(Role.APP_STAFF)
  resetKeycloakUserPassword(@Request() req: Request, @Param("id") id, @Body() password) {
    return this.service.resetKeycloakUserById(req, id, password.rawPasswword);
  }
}
