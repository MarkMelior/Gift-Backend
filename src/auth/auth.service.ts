import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { USER_NOT_FOUND_EMAIL_ERROR, WRONG_PASSWORD_ERROR } from './auth.const';
import { AuthRegisterDto } from './auth.dto';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
		private readonly refreshTokenService: RefreshTokenService,
	) {}

	async createUser(dto: AuthRegisterDto, res: Response) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.email,
			username: dto.username,
			passwordHash: await hash(dto.password, salt),
		});
		newUser.save();
		return this.login(newUser, res);
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserByUsername(username: string) {
		return this.userModel.findOne({ username }).exec();
	}

	async validateUser(login: string, password: string): Promise<User> {
		let user = await this.findUserByEmail(login);
		if (!user) {
			user = await this.findUserByUsername(login);
		}

		if (!user) throw new UnauthorizedException(USER_NOT_FOUND_EMAIL_ERROR);

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword)
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);

		return user;
	}

	async login({ username, id }: User, res: Response) {
		const payload = { username: username, sub: id };

		const access_token = await this.jwtService.signAsync(payload);
		const refresh_token = this.refreshTokenService.generateRefreshToken(id);

		res.cookie('refreshToken', refresh_token, {
			httpOnly: true,
			maxAge: 7 * 24 * 3600 * 1000,
		});
		res.cookie('accessToken', access_token, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000,
		});

		return res.json({ access_token });
		// return res.json({ message: 'Успешная авторизация' });
	}
}
