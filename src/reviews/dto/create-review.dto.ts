import { ReviewStatus } from '../review.schema';

export class CreateReviewDto {
	rating: number;
	comment: string;
	userId: number;
	status?: ReviewStatus;
}
