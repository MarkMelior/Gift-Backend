import { createZodDto } from 'nestjs-zod';
import {
	AuthLoginRequestSchema,
	AuthRegisterRequestSchema,
} from 'src/app/contracts/commands';

export class AuthRegisterDto extends createZodDto(AuthRegisterRequestSchema) {}

export class AuthLoginDto extends createZodDto(AuthLoginRequestSchema) {}
