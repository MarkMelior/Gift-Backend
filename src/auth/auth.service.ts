import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { USER_NOT_FOUND_EMAIL_ERROR, WRONG_PASSWORD_ERROR } from './auth.const';
import { AuthRegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthRegisterDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.email,
			username: dto.username,
			passwordHash: await hash(dto.password, salt),
		});
		newUser.save();
		return this.login(newUser.username);
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

	async login(username: string) {
		const payload = { username };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
