import { UserModel } from 'src/user/user.model';
import { ReviewStatus } from '../review.model';

export class CreateReviewDto {
	rating: number;
	comment: string;
	userId: Pick<UserModel, '_id'>;
	status?: ReviewStatus;
}
