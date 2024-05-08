import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';
import { ProductsModule } from 'src/products/products.module';
import { User, UserSchema } from 'src/user/user.schema';
import { ProductsHistoryController } from './products-history.controller';
import { ProductsHistoryService } from './products-history.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: User.name, schema: UserSchema },
		]),
		ProductsModule,
	],
	controllers: [ProductsHistoryController],
	providers: [ProductsHistoryService],
})
export class ProductsHistoryModule {}
