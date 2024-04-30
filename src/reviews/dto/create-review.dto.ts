import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty()
	rating: number;

	@MinLength(10, { message: WRONG_MIN_LENGTH_REVIEW })
	@MaxLength(800, { message: WRONG_MAX_LENGTH_REVIEW })
	@IsString()
	@ApiProperty()
	comment: string;

	@IsString()
	@IsMongoId()
	@ApiProperty()
	userId: string;

	@IsOptional()
	@IsEnum(ReviewStatus)
	@ApiProperty()
	status?: ReviewStatus;
}
