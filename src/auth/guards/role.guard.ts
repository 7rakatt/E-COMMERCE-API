import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const RequiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!RequiredRoles) return true;

    const request = context.switchToHttp().getRequest()
    const user = request.user;

    return matchUser(RequiredRoles,user?.role);
  }
}



function matchUser(RequiredRoles: string[], userRole: string[]) {
  return RequiredRoles.some((role: string) => 
    userRole?.includes(role))
}