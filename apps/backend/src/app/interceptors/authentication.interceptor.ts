import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { FastifyReply } from "fastify";

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> | Observable<any> {
    const httpResponse = context.switchToHttp().getResponse<FastifyReply>();

    return next.handle();
  }

}
