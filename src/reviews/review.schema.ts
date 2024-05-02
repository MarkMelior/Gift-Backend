import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ReviewStatus, ReviewStatusSchema } from 'src/app/contracts/commands';

@Schema({ timestamps: true })
export class Review {
	@Prop({ max: 5, min: 1 })
	rating: number;

	@Prop()
	comment: string;

	@Prop({
		default: ReviewStatusSchema.Enum.pending,
		type: () => ReviewStatusSchema.Enum,
		enum: ReviewStatusSchema.Enum,
	})
	status: ReviewStatus;

	@Prop()
	userId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
