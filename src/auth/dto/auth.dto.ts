import { IsEmail, IsString, Length } from 'class-validator';

export class AuthRegisterDto {
	@IsEmail()
	email: string;

	@Length(4, 14)
	@IsString()
	username: string;

	@Length(8, 32)
	@IsString()
	password: string;
}

export class AuthLoginDto {
	// @ValidateIf((o) => o.username === undefined)
	@IsEmail()
	email: string;

	// @ValidateIf((o) => o.email === undefined)
	// @Length(4, 14)
	// @IsString()
	// username: string;

	@Length(8, 32)
	@IsString()
	password: string;
}
