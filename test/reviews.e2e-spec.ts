import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { AuthLoginDto } from '../src/auth/dto/auth.dto';
import { CreateReviewDto } from '../src/reviews/dto/create-review.dto';
import { ReviewStatus } from '../src/reviews/review.schema';
import { REVIEW_NOT_FOUND } from '../src/reviews/reviews.const';

const userId = new Types.ObjectId().toHexString();

const loginDto: AuthLoginDto = {
	email: 'markus@g.com',
	password: '12345678',
};

const testDto: CreateReviewDto = {
	rating: 5,
	comment: 'Комментарий',
	userId,
};

describe('ReviewsController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);
		token = body.access_token;
	});

	afterEach(async () => {
		await app.close();
	});

	it('/reviews (POST) - success', async (done) => {
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

	it('/reviews (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/reviews')
			.send({ ...testDto, rating: 0 })
			.expect(400);
	});

	it('/reviews/byStatus/:status (GET)', async (done) => {
		return request(app.getHttpServer())
			.get('/reviews/byStatus/' + ReviewStatus.PENDING)
			.expect(200)
			.then(({ body }: request.Response) => {
				const commentWithCreatedId = body.find(({ _id }) => _id === createdId);
				expect(commentWithCreatedId.status).toBe(ReviewStatus.PENDING);
				done();
			});
	});

	it('/reviews/byUser/:id (GET) - success', async (done) => {
		return request(app.getHttpServer())
			.get('/reviews/byUser/' + userId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
				done();
			});
	});

	it('/reviews/byUser/:id (GET) - fail', async (done) => {
		return request(app.getHttpServer())
			.get('/reviews/byUser/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
				done();
			});
	});

	it('/reviews/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/reviews/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/reviews/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/reviews/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});
});
