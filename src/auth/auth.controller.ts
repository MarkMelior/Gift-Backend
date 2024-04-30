import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	ALREADY_REGISTERED_EMAIL_ERROR,
	ALREADY_REGISTERED_USERNAME_ERROR,
} from './auth.const';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthRegisterDto) {
		const oldEmail = await this.authService.findUserByEmail(dto.email);
		const oldUsername = await this.authService.findUserByUsername(dto.username);

		if (oldEmail) {
			throw new BadRequestException(ALREADY_REGISTERED_EMAIL_ERROR);
		}

		if (oldUsername) {
			throw new BadRequestException(ALREADY_REGISTERED_USERNAME_ERROR);
		}

		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() { login, password }: AuthLoginDto) {
		const user = await this.authService.validateUser(login, password);
		return this.authService.login(user.username);
	}
}
