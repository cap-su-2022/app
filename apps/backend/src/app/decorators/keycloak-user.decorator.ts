import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ParseTokenPipe } from "../pipes/parse-token.pipe";

export const KeycloakUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const accessToken =  ctx.switchToHttp().getRequest<Request>().headers['authorization'];
    if (accessToken === undefined || accessToken === null) {
      throw new UnauthorizedException("Access token is not provided");
    }
    return accessToken;
  },
);

export const User = (additionalOptions?: any) => KeycloakUser(additionalOptions, ParseTokenPipe);
