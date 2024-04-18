import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Product])],
	controllers: [ProductsController],
})
export class ProductsModule {}
