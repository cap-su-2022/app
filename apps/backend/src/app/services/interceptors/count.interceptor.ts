import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CountTransform = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

  }
)
