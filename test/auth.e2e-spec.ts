import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import {
	USER_NOT_FOUND_EMAIL_ERROR,
	WRONG_PASSWORD_ERROR,
} from '../src/auth/auth.const';
import { AuthLoginDto } from '../src/auth/auth.dto';

const loginDto: AuthLoginDto = {
	email: 'markus@g.com',
	password: '12345678',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

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

	it('/auth/login (POST) - success', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '00000000' } as AuthLoginDto)
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - fail email', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, email: 'unknown@g.com' } as AuthLoginDto)
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_EMAIL_ERROR,
				error: 'Unauthorized',
			});
	});
});
