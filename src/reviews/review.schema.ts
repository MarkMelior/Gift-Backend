import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum ReviewStatus {
	PENDING,
	ACCEPTED,
	REJECTED,
	MAIN,
}

@Schema({ timestamps: true })
export class Review {
	@Prop({ max: 5, min: 1 })
	rating: number;

	@Prop()
	comment: string;

	@Prop({
		default: ReviewStatus.PENDING,
		type: () => ReviewStatus,
		enum: ReviewStatus,
	})
	status: ReviewStatus;

	@Prop()
	userId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
