import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	async getUserByUsername(username: string) {
		return this.userModel
			.findOne({ username })
			.select({ passwordHash: 0 })
			.exec();
	}

	async getUserFavorites(username: string) {
		return this.userModel.findOne({ username }).exec();
	}

	// * проверка ролей на сервере
	// async getUserRoles(userId: string) {
	// 	const user = await this.userModel.findById(userId).exec();
	// 	return user.roles;
	// }
}
