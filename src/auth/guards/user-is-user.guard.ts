// import {
// 	CanActivate,
// 	ExecutionContext,
// 	Inject,
// 	Injectable,
// 	forwardRef,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { User } from 'src/user/user.schema';
// import { UsersService } from 'src/user/users.service';

// @Injectable()
// export class UserIsUserGuard implements CanActivate {
// 	constructor(
// 		@Inject(forwardRef(() => UsersService))
// 		private usersService: UsersService,
// 	) {}

// 	canActivate(
// 		context: ExecutionContext,
// 	): boolean | Promise<boolean> | Observable<boolean> {
// 		const request = context.switchToHttp().getRequest();

// 		const params = request.params;
// 		const user: User = request.user;

// 		return this.usersService.findOne(user.id).pipe(
// 			map((user: User) => {
// 				let hasPermission = false;

// 				if (user.id === Number(params.id)) {
// 					hasPermission = true;
// 				}

// 				return user && hasPermission;
// 			}),
// 		);
// 	}
// }
