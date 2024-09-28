import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // Access user information from the session
    const userId = request.session.userId;  // Assuming you store userId in session
    const userRole = request.session.userRole; // Assuming you store userRole in session

    // Check if user is authenticated
    if (!userId || !userRole) {
      throw new ForbiddenException('User not authenticated');
    }

    console.log('User role in AdminGuard:', userRole); // Log user role

    // Check if the user has admin privileges
    if (userRole !== 'admin') {
      throw new ForbiddenException('Access restricted to admin users');
    }

    return true;
  }
}
