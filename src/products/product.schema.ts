import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductMarketsSchema, SortFilters } from 'src/app/contracts/commands';

@Schema({ timestamps: true })
export class Product {
	@Prop({ type: () => [String] })
	images: string[];

	@Prop()
	title: string;

	@Prop()
	creativity: number;

	@Prop({ type: () => [String] })
	filters: SortFilters[];

	@Prop({ _id: false, type: () => Object })
	options: Record<string, string>;

	@Prop({ type: () => [typeof ProductMarketsSchema] })
	markets: (typeof ProductMarketsSchema)[];

	@Prop({ unique: true })
	article: string;

	@Prop()
	description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
