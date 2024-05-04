import { z } from 'zod';
import { StringToNumber } from '../../utils/string-to-number';

export const SortCategoryEnum = z.enum(['birthday', 'love', 'year', 'joke']);
export const SortSexEnum = z.enum(['male', 'female']);
export const SortAgeEnum = z.enum(['kid', 'adult', 'old']);
export const SortSortingEnum = z.enum([
	'popular',
	'rating',
	'creativity',
	'expensive',
	'cheap',
	'new',
]);
export const SortFiltersEnums = z.union([
	SortCategoryEnum,
	SortSexEnum,
	SortAgeEnum,
]);
export const MarketTypeEnum = z.enum([
	'ozon',
	'yandex',
	'aliexpress',
	'wildberries',
	'sber',
]);

export type SortCategory = z.infer<typeof SortCategoryEnum>;
export type SortSex = z.infer<typeof SortSexEnum>;
export type SortAge = z.infer<typeof SortAgeEnum>;
export type SortSorting = z.infer<typeof SortSortingEnum>;
export type SortFilters = z.infer<typeof SortFiltersEnums>;
export type MarketType = z.infer<typeof MarketTypeEnum>;

export const CharacteristicsSchema = z.record(
	z.union([z.string(), z.array(z.string()), z.record(z.string())]),
);

export const ProductMarketsSchema = z.object({
	market: MarketTypeEnum,
	link: z.string().min(6),
	rating: z.number().min(1).max(5),
	reviewCount: z.number(),
	price: z.number(),
	oldPrice: z.number().optional(),
});

export const ProductCreateRequestSchema = z.object({
	title: z.string().min(5),
	creativity: z.number().max(10).min(1),
	filters: z.array(SortFiltersEnums).optional(),
	characteristics: CharacteristicsSchema.optional(),
	markets: z.array(ProductMarketsSchema).min(1),
	seoText: z.string().optional(),
	images: z.array(z.string()).min(1).optional(),
	article: z
		.string()
		.min(9)
		.max(9)
		.default(String(Math.floor(Math.random() * 900000000) + 100000000))
		.optional(),
});

export const ProductFindRequestSchema = z.object({
	limit: StringToNumber.optional(),
	articles: z.array(z.string()).optional(),
	sort: SortSortingEnum.default('popular').optional(),
	param: z.string().optional(),
	filters: z.array(SortFiltersEnums).optional(),
	maxPrice: StringToNumber.optional(),
	minPrice: StringToNumber.optional(),
});

export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
export type ProductFindRequest = z.infer<typeof ProductFindRequestSchema>;
export type ProductMarkets = z.infer<typeof ProductMarketsSchema>;

export interface ProductResponse {
	_id: string;
	article: string;
	images: string[];
	title: string;
	creativity: number;
	filters: SortFilters[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: ProductMarkets[];
	seoText?: string;
}

export interface ProductCardResponse {
	images: string[];
	title: string;
	markets: ProductMarkets[];
	article: string;
}

export interface ProductPricesResponse {
	minPrice: number;
	maxPrice: number;
	avgPrice: number;
}
