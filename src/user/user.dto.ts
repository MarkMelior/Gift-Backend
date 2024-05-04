import { createZodDto } from 'nestjs-zod';
import { UserFindRequestSchema } from 'src/app/contracts/commands';

export class UserFindDto extends createZodDto(UserFindRequestSchema) {}
