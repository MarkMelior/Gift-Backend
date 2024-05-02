import { createZodDto } from 'nestjs-zod';
import { ProductFindRequestSchema } from 'src/app/contracts/commands';

export class FindProductDto extends createZodDto(ProductFindRequestSchema) {}
