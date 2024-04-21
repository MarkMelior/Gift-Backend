import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { FilterSortProps } from '../product.schema';

export enum SortSorting {
	POPULAR = 'popular',
	RATING = 'rating',
	CREATIVITY = 'creativity',
	EXPENSIVE = 'expensive',
	CHEAP = 'cheap',
	NEW = 'new',
}

export class FindProductDto {
	@Min(1)
	@IsNumber()
	limit: number;

	@IsEnum(SortSorting)
	sort?: SortSorting = SortSorting.POPULAR;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	filters?: FilterSortProps[];

	@IsOptional()
	@IsNumber()
	maxPrice?: number;

	@IsOptional()
	@IsNumber()
	minPrice?: number;
}
