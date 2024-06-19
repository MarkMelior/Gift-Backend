import { z } from 'zod';

export const WRONG_EMAIL = 'Некорректный email';

export const WRONG_LENGTH_USERNAME =
	'Длинна имени должна быть от 4 до 14 символов';

export const WRONG_MIN_LENGTH_PASSWORD =
	'Длинна пароля должна быть не меньше 8 символов';

export const WRONG_MAX_LENGTH_PASSWORD =
	'Длинна пароля не должна превышать 32 символа';

export const AuthLoginRequestSchema = z.object({
	login: z
		.string()
		.min(4, { message: 'Логин не должен быть короче 4 символов' }),
	password: z
		.string()
		.max(32, { message: WRONG_MAX_LENGTH_PASSWORD })
		.min(8, { message: WRONG_MIN_LENGTH_PASSWORD }),
});

export const AuthRegisterRequestSchema = z.object({
	email: z.string().email({ message: WRONG_EMAIL }),
	username: z
		.string()
		.max(14, { message: WRONG_LENGTH_USERNAME })
		.min(4, { message: WRONG_LENGTH_USERNAME }),
	avatar: z.string().optional(),
	password: z
		.string()
		.max(32, { message: WRONG_MAX_LENGTH_PASSWORD })
		.min(8, { message: WRONG_MIN_LENGTH_PASSWORD }),
});

export const AuthResponseSchema = z.object({
	access_token: z.string(),
});

export type AuthLoginRequest = z.infer<typeof AuthLoginRequestSchema>;
export type AuthRegisterRequest = z.infer<typeof AuthRegisterRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
