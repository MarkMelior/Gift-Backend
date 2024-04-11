export enum ReviewStatus {
	PENDING,
	ACCEPTED,
	REJECTED,
	MAIN,
}

export class ReviewModel {
	_id: number;
	rating: number; // max 5 min 1
	comment: string;
	status: ReviewStatus;
	userId: number; // ? number
}
