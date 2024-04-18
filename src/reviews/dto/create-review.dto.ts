import { ReviewStatus } from '../review.schema';

export class CreateReviewDto {
	rating: number;
	comment: string;
	userId: string;
	status?: ReviewStatus;
}
