import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './app/config/typeorm.config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormConfig,
		}),
		AuthModule,
		UserModule,
		ReviewModule,
		ProductModule,
	],
	controllers: [
		AuthController,
		UserController,
		ReviewController,
		ProductController,
	],
	providers: [],
})
export class AppModule {
	// constructor(private dataSource: DataSource) {}
}
