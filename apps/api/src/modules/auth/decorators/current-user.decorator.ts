import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoggedInRequest } from 'src/shared/types/request';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<LoggedInRequest>();
    return request.user;
  },
);
