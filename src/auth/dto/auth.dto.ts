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
	email: string;

	@Length(4, 14, { message: WRONG_LENGTH_USERNAME })
	@IsString()
	username: string;

	@IsOptional()
	@IsString()
	avatar?: string;

	@MinLength(8, { message: WRONG_MIN_LENGTH_PASSWORD })
	@MaxLength(32, { message: WRONG_MAX_LENGTH_PASSWORD })
	@IsString()
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
	login: string;

	@MinLength(8, { message: WRONG_MIN_LENGTH_PASSWORD })
	@MaxLength(32, { message: WRONG_MAX_LENGTH_PASSWORD })
	@IsString()
	password: string;
}
