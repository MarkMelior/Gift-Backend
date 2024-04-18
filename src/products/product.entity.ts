import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamps } from '../app/lib/classes/timestamp';

export type Currency = 'RUB' | 'USD' | 'EUR';

export type MarketType =
	| 'ozon'
	| 'yandex'
	| 'aliexpress'
	| 'wildberries'
	| 'sber';

export class MarketsProductData {
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
export class Product extends TimeStamps {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column({ type: 'simple-array' })
	images: string[];

	@Column()
	title: string;

	@Column()
	creativity: number;

	@Column({ type: 'simple-array' })
	filters: FilterSortProps[];

	@Column({ type: 'json' })
	characteristics: Record<string, string[] | Record<string, string>>;

	@Column({ type: 'simple-array' })
	markets: MarketsProductData[];

	@Column()
	description?: string;
}
