import { FilterSortProps } from '../product.model';

export class FindProductDto {
	limit: number;
	filters?: FilterSortProps[];
	maxPrice?: number;
	minPrice?: number;
}
