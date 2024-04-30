import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Gift API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

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
