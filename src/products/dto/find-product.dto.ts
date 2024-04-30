import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty()
	limit: string;

	@IsEnum(SortSorting)
	@ApiProperty()
	sort?: SortSorting = SortSorting.POPULAR;

	@IsOptional()
	// @IsArray()
	// @IsString({ each: true })
	// filters?: FilterSortProps[];
	@ApiProperty()
	filters?: string;

	@IsOptional()
	// @IsNumber()
	@ApiProperty()
	maxPrice?: string;

	@IsOptional()
	// @IsNumber()
	@ApiProperty()
	minPrice?: string;
}
