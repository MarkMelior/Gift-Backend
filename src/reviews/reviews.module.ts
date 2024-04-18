import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.schema';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Review.name,
				schema: ReviewSchema,
			},
		]),
	],
	providers: [ReviewsService],
	controllers: [ReviewsController],
	exports: [ReviewsService],
})
export class ReviewsModule {}
