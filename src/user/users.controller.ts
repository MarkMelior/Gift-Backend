import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtData } from '../auth/decorators/jwt-data.decorator';
import { UserFindDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async getUser(@JwtData() username: string) {
		return this.usersService.getUser(username);
	}

	@Get('find')
	async findUsers(@Query() dto: UserFindDto) {
		return this.usersService.findUsers(dto);
	}

	// todo
	// @Post('avatars')
	// @HttpCode(HttpStatus.OK)
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @UseInterceptors(FileInterceptor('image'))
	// async uploadAvatar(
	// 	@UploadedFile(
	// 		new ParseFilePipe({
	// 			validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 })],
	// 		}),
	// 	)
	// 	files: Express.Multer.File,
	// 	@JwtData() username: string,
	// ) {
	// 	return this.filesService.uploadAvatar(files, username);
	// }

	// @Get('avatars/:userId')
	// async getAvatar(@Param('userId') userId: string) {
	// 	return this.filesService.findProductImages(userId);
	// }
}
