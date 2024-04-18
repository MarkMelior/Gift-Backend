import { FilterSortProps } from '../product.schema';

export class FindProductDto {
	limit: number;
	filters?: FilterSortProps[];
	maxPrice?: number;
	minPrice?: number;
}
