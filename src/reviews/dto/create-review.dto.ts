import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { ReviewStatus } from '../review.schema';

export class CreateReviewDto {
	@Max(5, { message: 'Рейтинг должен быть от 1 до 5' })
	@Min(1, { message: 'Рейтинг должен быть от 1 до 5' })
	@IsNumber()
	rating: number;

	@IsString()
	comment: string;

	@IsString()
	userId: string;

	@IsOptional()
	@IsEnum(ReviewStatus)
	status?: ReviewStatus;
}
