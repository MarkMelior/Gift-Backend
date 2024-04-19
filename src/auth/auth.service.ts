import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { USER_NOT_FOUND_EMAIL_ERROR, WRONG_PASSWORD_ERROR } from './auth.const';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { User } from './user.schema';

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
		return newUser.save();
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserByUsername(username: string) {
		return this.userModel.findOne({ username }).exec();
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<Pick<AuthLoginDto, 'email'>> {
		const user = await this.findUserByEmail(email);
		if (!user) throw new UnauthorizedException(USER_NOT_FOUND_EMAIL_ERROR);

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword)
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
