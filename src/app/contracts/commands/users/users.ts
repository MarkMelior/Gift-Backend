import { z } from 'zod';
import { MongoDefaultType } from '../../utils/mongo-default-type';

export const UserRoleEnum = z.enum(['admin', 'manager']);

export type UserRole = z.infer<typeof UserRoleEnum>;

export const UserFindRequestSchema = z.object({
	// limit: StringToNumber.default(5),
	usernames: z.array(z.string()).optional(),
	usersIds: z.array(z.string()).optional(),
});

export type UserFindRequest = z.infer<typeof UserFindRequestSchema>;

export interface UserResponse extends MongoDefaultType {
	id: string;
	email: string;
	username: string;
	gameId?: string;

	avatar?: string;
	roles?: UserRole[];
	favorites?: string[];
	history?: string[];
	first?: string;
	last?: string;

	// sex?: Gender;
	// confidentiality?: ConfidentialityProfile;
}
