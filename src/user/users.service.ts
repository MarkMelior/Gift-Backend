import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFindDto } from './user.dto';
import { User } from './user.schema';
import { USER_NOT_FOUND_ERROR, USER_REQUEST } from './users.const';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	async getUser(username: string) {
		const user = await this.userModel
			.findOne({ username })
			.select(USER_REQUEST)
			.exec();

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return user;
	}

	async findUsers(dto: UserFindDto) {
		const aggregatePipeline = [];

		if (dto.usernames) {
			aggregatePipeline.push({
				$match: {
					username: { $in: dto.usernames },
				},
			});
		}

		if (dto.usersIds) {
			aggregatePipeline.push({
				$match: {
					id: { $in: dto.usersIds },
				},
			});
		}

		// aggregatePipeline.push({ $limit: dto.limit });

		return (
			this.userModel
				.aggregate(aggregatePipeline)
				// .project(PRODUCTS_CARD_DTO)
				.exec()
		);
	}

	// todo
	// async getStatistics() {}
}
