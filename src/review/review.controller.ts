import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel, ReviewStatus } from './review.model';

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Get('byStatus/:status')
	async getByStatus(@Param('status') status: ReviewStatus) {}
}
