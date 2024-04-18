import { FilterSortProps } from '../product.entity';

export class FindProductDto {
	limit: number;
	filters?: FilterSortProps[];
	maxPrice?: number;
	minPrice?: number;
}
