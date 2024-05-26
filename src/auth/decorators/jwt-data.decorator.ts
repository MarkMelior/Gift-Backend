import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const JwtData = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		// return request.user;

		const jwtService = new JwtService({
			secret: process.env.JWT_SECRET,
		});
		const authHeader = request.headers.authorization;
		const token = authHeader.split(' ')[1];
		const decoded = jwtService.decode(token);

		return decoded['username'];
	},
);
