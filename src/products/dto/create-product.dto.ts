import { createZodDto } from 'nestjs-zod';
import { ProductCreateRequestSchema } from 'src/app/contracts/commands';

export class CreateProductDto extends createZodDto(
	ProductCreateRequestSchema,
) {}
