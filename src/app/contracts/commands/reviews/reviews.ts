import { z } from 'zod';
import { StringToNumber } from '../../utils/string-to-number';

export const REVIEW_NOT_FOUND = 'Отзыв с таким ID не найден';

export const WRONG_RATING = 'Рейтинг должен быть от 1 до 5';

export const WRONG_MIN_LENGTH_REVIEW =
	'Минимальная длинна комментария 10 символов';

export const WRONG_MAX_LENGTH_REVIEW =
	'Максимальная длинна комментария 800 символов';

export const ReviewStatusSchema = z.enum(['pending', 'accepted', 'rejected']);

export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;

export const ReviewCreateRequestSchema = z.object({
	rating: z
		.number()
		.min(1, { message: WRONG_RATING })
		.max(5, { message: WRONG_RATING }),
	comment: z
		.string()
		.min(10, { message: WRONG_MIN_LENGTH_REVIEW })
		.max(800, { message: WRONG_MAX_LENGTH_REVIEW }),
	userId: z.string(),
	status: ReviewStatusSchema.optional(),
});

export const ReviewFindRequestSchema = z.object({
	limit: StringToNumber.default(10),
	userId: z.string().optional(),
	status: ReviewStatusSchema.optional(),
});

export type ReviewCreateRequest = z.infer<typeof ReviewCreateRequestSchema>;

export type ReviewFindRequest = z.infer<typeof ReviewFindRequestSchema>;

export interface ReviewResponse {
	_id: string;
	rating: number;
	comment: string;
	status: ReviewStatus;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
