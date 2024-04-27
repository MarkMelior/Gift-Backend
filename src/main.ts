import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.setGlobalPrefix('api');

	// Улучшенный формат сообщений об ошибках
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				return new UnprocessableEntityException({
					statusCode: 422,
					error: 'Unprocessable Entity',
					message: errors.reduce(
						(acc, e) => ({
							...acc,
							[e.property]: Object.values(e.constraints),
						}),
						{},
					),
				});
			},
		}),
	);

	await app.listen(process.env.PORT, () => {
		console.log(`Server started on port ${process.env.PORT}`);
	});
}
bootstrap();
