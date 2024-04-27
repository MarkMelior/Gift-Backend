import {
	Controller,
	Get,
	NotFoundException,
	Param,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtData } from '../app/decorators/jwt-data.decorator';
import { USER_NOT_FOUND_ERROR } from './users.const';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		return this.usersService.getUserByUsername(username);
	}

	// * проверка ролей на сервере
	// @UseGuards(JwtAuthGuard)
	// @Get('roles/:userId')
	// async getUserRoles(@Param('userId') userId: string) {
	// 	return this.usersService.getUserRoles(userId);
	// }

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUsername(@JwtData() username: string) {
		const user = await this.usersService.getUserByUsername(username);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return user;
	}
}
