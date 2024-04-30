import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested,
} from 'class-validator';
import { FilterSortProps } from '../product.schema';
import { MarketsProductDto } from './markets-product.dto';

export class CreateProductDto {
	@IsArray()
	@IsString({ each: true })
	@ApiProperty()
	images: string[];

	@IsString()
	@ApiProperty()
	title: string;

	@IsNumber()
	@Max(5)
	@Min(1)
	@ApiProperty()
	creativity: number;

	@IsArray()
	@IsString({ each: true })
	@ApiProperty()
	filters: FilterSortProps[];

	@IsObject()
	@ApiProperty()
	characteristics: Record<string, string[] | Record<string, string>>;

	@IsArray()
	@ValidateNested()
	@Type(() => MarketsProductDto)
	@ApiProperty()
	markets: MarketsProductDto[];

	@IsString()
	@IsOptional()
	@ApiProperty()
	seoText?: string;
}
