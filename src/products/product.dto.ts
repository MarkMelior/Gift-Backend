import { createZodDto } from 'nestjs-zod';
import {
	ProductCreateRequestSchema,
	ProductFindRequestSchema,
} from 'src/app/contracts/commands';

export class ProductCreateDto extends createZodDto(
	ProductCreateRequestSchema,
) {}

export class ProductsFindDto extends createZodDto(ProductFindRequestSchema) {}
