import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/app/contracts';
import { UsersService } from 'src/user/users.service';
import { ACCESS_ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>(
			ACCESS_ROLES_KEY,
			context.getHandler(),
		);
		if (!roles) return true;

		const request = context.switchToHttp().getRequest();
		const user: string = request.user;

		try {
			const fetchedUser = await this.usersService.getUser(user);
			const hasRole = roles.some((role) =>
				fetchedUser.roles.includes(role as UserRole),
			);
			return hasRole;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
