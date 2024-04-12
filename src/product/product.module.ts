import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';

@Module({
	imports: [TypeOrmModule.forFeature([ProductModel])],
	controllers: [ProductController],
})
export class ProductModule {}
