import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsOptional,
	IsString,
	Length,
	MaxLength,
	MinLength,
} from 'class-validator';
import {
	WRONG_EMAIL,
	WRONG_LENGTH_USERNAME,
	WRONG_MAX_LENGTH_PASSWORD,
	WRONG_MIN_LENGTH_PASSWORD,
} from '../auth.const';

export class AuthRegisterDto {
	@IsEmail({}, { message: WRONG_EMAIL })
	@ApiProperty()
	email: string;

	@Length(4, 14, { message: WRONG_LENGTH_USERNAME })
	@IsString()
	@ApiProperty()
	username: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	avatar?: string;

	@MinLength(8, { message: WRONG_MIN_LENGTH_PASSWORD })
	@MaxLength(32, { message: WRONG_MAX_LENGTH_PASSWORD })
	@IsString()
	@ApiProperty()
	password: string;
}

export class AuthLoginDto {
	// @ValidateIf((o) => o.username === undefined)
	// @IsEmail({}, { message: WRONG_EMAIL })
	// email: string;

	// @ValidateIf((o) => o.email === undefined)
	// @Length(4, 14)
	// @IsString()
	// username: string;

	@Length(4, 64)
	@IsString()
	@ApiProperty()
	login: string;

	@MinLength(8, { message: WRONG_MIN_LENGTH_PASSWORD })
	@MaxLength(32, { message: WRONG_MAX_LENGTH_PASSWORD })
	@IsString()
	@ApiProperty()
	password: string;
}
