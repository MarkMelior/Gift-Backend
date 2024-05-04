import { z } from 'zod';

export const UserRoleEnum = z.enum(['admin', 'manager']);

export type UserRole = z.infer<typeof UserRoleEnum>;

export const UserFindRequestSchema = z.object({
	// limit: StringToNumber.default(5),
	usernames: z.array(z.string()).optional(),
	usersIds: z.array(z.string()).optional(),
});

export type UserFindRequest = z.infer<typeof UserFindRequestSchema>;

export interface UserResponse {
	_id: string;
	id: string;
	email: string;
	username: string;

	avatar?: string;
	roles?: UserRole[];
	favorites?: string[];
	history?: string[];
	first?: string;
	last?: string;

	gameId?: string;
	// sex?: Gender;
	// confidentiality?: ConfidentialityProfile;
}
