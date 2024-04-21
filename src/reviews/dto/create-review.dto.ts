import {
	IsEnum,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import { ReviewStatus } from '../review.schema';
import {
	WRONG_MAX_LENGTH_REVIEW,
	WRONG_MIN_LENGTH_REVIEW,
	WRONG_RATING,
} from '../reviews.const';

export class CreateReviewDto {
	@Max(5, { message: WRONG_RATING })
	@Min(1, { message: WRONG_RATING })
	@IsNumber()
	rating: number;

	@MinLength(10, { message: WRONG_MIN_LENGTH_REVIEW })
	@MaxLength(800, { message: WRONG_MAX_LENGTH_REVIEW })
	@IsString()
	comment: string;

	@IsString()
	@IsMongoId()
	userId: string;

	@IsOptional()
	@IsEnum(ReviewStatus)
	status?: ReviewStatus;
}
