import { createZodDto } from 'nestjs-zod';
import {
	ReviewCreateRequestSchema,
	ReviewFindRequestSchema,
} from 'src/app/contracts/commands';

export class ReviewCreateDto extends createZodDto(ReviewCreateRequestSchema) {}

export class ReviewsFindDto extends createZodDto(ReviewFindRequestSchema) {}
