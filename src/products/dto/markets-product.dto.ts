import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty()
	market: MarketType;

	@IsString()
	@ApiProperty()
	link: string;

	@IsNumber()
	@Max(5)
	@Min(1)
	@ApiProperty()
	rating: number;

	@IsNumber()
	@ApiProperty()
	reviewCount: number;

	// @IsEnum(Currency) // ! fix?
	// currency: Currency;

	@IsNumber()
	@ApiProperty()
	price: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty()
	oldPrice?: number;
}
