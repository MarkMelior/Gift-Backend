import { IsEnum, IsOptional } from 'class-validator';

export enum SortSorting {
	POPULAR = 'popular',
	RATING = 'rating',
	CREATIVITY = 'creativity',
	EXPENSIVE = 'expensive',
	CHEAP = 'cheap',
	NEW = 'new',
}

export class FindProductDto {
	// @Min(1)
	// @IsNumber()
	limit: string;

	@IsEnum(SortSorting)
	sort?: SortSorting = SortSorting.POPULAR;

	@IsOptional()
	// @IsArray()
	// @IsString({ each: true })
	// filters?: FilterSortProps[];
	filters?: string;

	@IsOptional()
	// @IsNumber()
	maxPrice?: string;

	@IsOptional()
	// @IsNumber()
	minPrice?: string;
}
