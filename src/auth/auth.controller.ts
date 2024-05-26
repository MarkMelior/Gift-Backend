import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
	ALREADY_REGISTERED_EMAIL_ERROR,
	ALREADY_REGISTERED_USERNAME_ERROR,
} from './auth.const';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly refreshTokenService: RefreshTokenService,
		private readonly jwtService: JwtService,
	) {}

	@Post('register')
	async register(@Body() dto: AuthRegisterDto, @Res() res: Response) {
		const oldEmail = await this.authService.findUserByEmail(dto.email);
		const oldUsername = await this.authService.findUserByUsername(dto.username);

		if (oldEmail) {
			throw new BadRequestException(ALREADY_REGISTERED_EMAIL_ERROR);
		}

		if (oldUsername) {
			throw new BadRequestException(ALREADY_REGISTERED_USERNAME_ERROR);
		}

		return this.authService.createUser(dto, res);
	}

	@Post('login')
	async login(@Body() { login, password }: AuthLoginDto, @Res() res: Response) {
		const user = await this.authService.validateUser(login, password);

		return this.authService.login(user, res);
	}

	@Post('refresh')
	async refresh(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies['refreshToken'];
		if (!refreshToken) {
			return res.status(401).json({ message: 'Refresh token not found' });
		}
		const userId = this.refreshTokenService.validateRefreshToken(refreshToken);
		if (!userId) {
			return res.status(401).json({ message: 'Invalid refresh token' });
		}
		const newAccessToken = this.jwtService.sign(
			{ userId },
			{ secret: process.env.JWT_SECRET, expiresIn: '15m' },
		);
		res.cookie('accessToken', newAccessToken, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000,
		});
		return res.json({ access_token: newAccessToken });
	}
}
