export type Currency = 'RUB' | 'USD' | 'EUR';

export type MarketType =
	| 'ozon'
	| 'yandex'
	| 'aliexpress'
	| 'wildberries'
	| 'sber';

export interface MarketsProductData {
	market: MarketType;
	link: string;
	rating: number;
	reviewCount: number;
	currency: Currency;
	price: number;
	oldPrice?: number;
}

export type SortCategory = 'birthday' | 'love' | 'year' | 'joke';
export type SortSex = 'male' | 'female';
export type SortAge = 'kid' | 'adult' | 'old';
export type SortSorting =
	| 'popular'
	| 'rating'
	| 'creativity'
	| 'expensive'
	| 'cheap'
	| 'new';

export type FilterSortProps = SortCategory | SortSex | SortAge | SortSorting;

export class ProductModel {
	_id: number;
	images: string[];
	title: string;
	creativity: number;
	filters: FilterSortProps[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: MarketsProductData[];
	description?: string;
}
