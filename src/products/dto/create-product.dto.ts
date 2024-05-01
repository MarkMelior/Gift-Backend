import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested,
} from 'class-validator';
import { FilterSortProps } from '../product.schema';
import { MarketsProductDto } from './markets-product.dto';

export class CreateProductDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ApiProperty()
	images?: string[];

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	@Max(5)
	@Min(1)
	@IsNotEmpty()
	@ApiProperty()
	creativity: number;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	@ApiProperty()
	filters?: FilterSortProps[];

	@IsObject()
	@IsOptional()
	@ApiProperty()
	characteristics?: Record<string, string[] | Record<string, string>>;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MarketsProductDto)
	@IsNotEmpty()
	@ApiProperty()
	markets: MarketsProductDto[];

	@IsString()
	@IsOptional()
	@ApiProperty()
	seoText?: string;
}

// export class MultipartProductDto {
// 	@ValidateNested()
// 	@Transform(
// 		({ value }) => {
// 			try {
// 				return plainToClass(CreateProductDto, JSON.parse(value));
// 			} catch (error) {
// 				return 'invalid_json_format';
// 			}
// 		},
// 		{ toClassOnly: true },
// 	)
// 	@Type(() => CreateProductDto)
// 	readonly body: CreateProductDto;
// }
