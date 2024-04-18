import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testDto: CreateReviewDto = {
	rating: 5,
	comment: 'Комментарий',
	userId: 1,
};

describe('ReviewController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it('/reviews (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/reviews')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
				done();
			});
	});

	it('/reviews/:id (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/reviews/' + createdId)
			.expect(200);
	});
});
