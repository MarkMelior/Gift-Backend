import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
	let service: ReviewsService;

	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = () => ({
		find: () => exec,
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewsService,
				{
					useFactory: reviewRepositoryFactory,
					provide: getModelToken('reviewModel'),
				},
			],
		}).compile();

		service = module.get<ReviewsService>(ReviewsService);
	});

	it('Should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByUserId working', async () => {
		const id = new Types.ObjectId().toHexString();
		reviewRepositoryFactory()
			.find()
			.exec.mockReturnValueOnce([{ userId: id }]);
		const res = await service.findByUserId(id);
		expect(res[0].userId).toBe(id);
	});

	// it('findByStatus working', async () => {
	// 	const id = new Types.ObjectId().toHexString();
	// 	reviewRepositoryFactory()
	// 		.find()
	// 		.exec.mockReturnValueOnce([{ userId: id }]);
	// 	const res = await service.findByStatus(ReviewStatus.PENDING);
	// 	expect(res[0].userId).toBe(id);
	// });
});
