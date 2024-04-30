import {
	Controller,
	Get,
	NotFoundException,
	Param,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesService } from 'src/files/files.service';
import { JwtData } from '../app/decorators/jwt-data.decorator';
import { USER_NOT_FOUND_ERROR } from './users.const';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly filesService: FilesService,
	) {}

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		return this.usersService.getUserByUsername(username);
	}

	// * проверка ролей на сервере
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @Get('roles/:userId')
	// async getUserRoles(@Param('userId') userId: string) {
	// 	return this.usersService.getUserRoles(userId);
	// }

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get()
	async getUsername(@JwtData() username: string) {
		const user = await this.usersService.getUserByUsername(username);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return user;
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
