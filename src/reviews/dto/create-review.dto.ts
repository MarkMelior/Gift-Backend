import { ReviewStatus } from '../review.entity';

export class CreateReviewDto {
	rating: number;
	comment: string;
	userId: number;
	status?: ReviewStatus;
}
