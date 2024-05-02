import { createZodDto } from 'nestjs-zod';
import { ReviewCreateRequestSchema } from 'src/app/contracts/commands';

export class CreateReviewDto extends createZodDto(ReviewCreateRequestSchema) {}
