import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtData } from '../app/decorators/jwt-data.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		return this.usersService.getUserByUsername(username);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUsername(@JwtData() username: string) {
		const user = await this.usersService.getUserByUsername(username);
		return user;

		// return username;
	}
}
