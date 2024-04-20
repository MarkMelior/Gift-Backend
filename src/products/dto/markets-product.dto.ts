import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

export enum MarketType {
	OZON = 'ozon',
	YANDEX = 'yandex',
	ALIEXPRESS = 'aliexpress',
	WILDBERRIES = 'wildberries',
	SBER = 'sber',
}

export class MarketsProductDto {
	@IsEnum(MarketType, {
		message:
			'Invalid market type. Must be one of: ozon, yandex, aliexpress, wildberries, sber',
	})
	market: MarketType;

	@IsString()
	link: string;

	@IsNumber()
	@Max(5)
	@Min(1)
	rating: number;

	@IsNumber()
	reviewCount: number;

	// @IsEnum(Currency) // ! fix?
	// currency: Currency;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	oldPrice?: number;
}
