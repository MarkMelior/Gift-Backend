import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		exposedHeaders: ['X-Total-Products'],
	});
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ZodValidationPipe());
	app.use(cookieParser());

	// * swagger
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

	await app.listen(process.env.PORT, () => {
		console.log(`Server started on port ${process.env.PORT}`);
	});
}
bootstrap();
