import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/user/auth/auth.service';

export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || !session.userId) {
      return false;
    }

    const user = await this.authService.getUser(session.userId);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
