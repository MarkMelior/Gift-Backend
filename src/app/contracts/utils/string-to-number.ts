import { z } from 'zod';

export const StringToNumber = z
	.union([z.number(), z.string()])
	.transform((value) =>
		typeof value === 'string' ? parseInt(value, 10) : value,
	);
