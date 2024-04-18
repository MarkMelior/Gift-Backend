import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

@Schema({ timestamps: true })
export class Product {
	@Prop({ type: () => [String] })
	images: string[];

	@Prop()
	title: string;

	@Prop()
	creativity: number;

	@Prop({ type: () => [String] })
	filters: FilterSortProps[];

	@Prop({ _id: false, type: () => Object })
	characteristics: Record<string, string[] | Record<string, string>>;

	@Prop({ type: () => [MarketsProductData] })
	markets: MarketsProductData[];

	@Prop()
	description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
