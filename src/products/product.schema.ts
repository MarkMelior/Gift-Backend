import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MarketsProductDto } from './dto/markets-product.dto';

export enum Currency {
	RUB = 'RUB',
	USD = 'USD',
	EUR = 'EUR',
}

export type SortCategory = 'birthday' | 'love' | 'year' | 'joke';
export type SortSex = 'male' | 'female';
export type SortAge = 'kid' | 'adult' | 'old';

export type FilterSortProps = SortCategory | SortSex | SortAge;

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

	@Prop({ type: () => [MarketsProductDto] })
	markets: MarketsProductDto[];

	@Prop()
	seoText?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
