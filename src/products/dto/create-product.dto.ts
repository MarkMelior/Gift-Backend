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
	images: string[];

	@IsString()
	title: string;

	@IsNumber()
	@Max(5)
	@Min(1)
	creativity: number;

	@IsArray()
	@IsString({ each: true })
	filters: FilterSortProps[];

	@IsObject()
	characteristics: Record<string, string[] | Record<string, string>>;

	@IsArray()
	@ValidateNested()
	@Type(() => MarketsProductDto)
	markets: MarketsProductDto[];

	@IsString()
	@IsOptional()
	seoText?: string;
}
