import { Request } from 'express';
import { AuthUser } from 'src/modules/users/entity/user';

export interface LoggedInRequest extends Request {
  user: AuthUser;
}
