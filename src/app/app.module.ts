import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FilesModule } from 'src/files/files.module';
import { ProductsHistoryModule } from 'src/products-history/products-history.module';
import { UsersModule } from 'src/user/users.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { getMongoConfig } from './config/mongo.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		ReviewsModule,
		ProductsModule,
		FilesModule,
		UsersModule,
		FavoritesModule,
		ProductsHistoryModule,
		// TelegramModule.forRootAsync({
		// 	imports: [ConfigModule],
		// 	inject: [ConfigService],
		// 	useFactory: getTelegramConfig,
		// }),
	],
	providers: [
		// {
		// 	provide: 'APP_GUARD',
		// 	useClass: RolesGuard,
		// },
	],
})
export class AppModule {}
