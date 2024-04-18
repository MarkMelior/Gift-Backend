import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewStatus } from './review.entity';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewsRepository: Repository<Review>,
	) {}

	async create(dto: CreateReviewDto): Promise<Review> {
		return this.reviewsRepository.create(dto);
	}

	async delete(id: string): Promise<Review> {
		const review = await this.reviewsRepository.findOneBy({
			_id: parseInt(id),
		});

		return this.reviewsRepository.remove(review);
	}

	async findByUserId(user: User): Promise<Review[]> {
		return this.reviewsRepository.findBy({ user });
	}

	async findByStatus(status: ReviewStatus): Promise<Review[]> {
		return this.reviewsRepository.findBy({ status });
	}
}
