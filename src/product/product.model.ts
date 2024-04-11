import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity('products')
export class ProductModel {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column()
	images: string[];

	@Column()
	title: string;

	@Column()
	creativity: number;

	@Column()
	filters: FilterSortProps[];

	@Column()
	characteristics: Record<string, string[] | Record<string, string>>;

	@Column()
	markets: MarketsProductData[];

	@Column()
	description?: string;
}
