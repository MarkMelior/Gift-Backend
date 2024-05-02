import { z } from 'zod';

export const UserRoleEnum = z.enum(['admin', 'manager']);

export type UserRole = z.infer<typeof UserRoleEnum>;

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
