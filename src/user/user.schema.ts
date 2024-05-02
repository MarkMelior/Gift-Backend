import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/app/contracts';

export type Country = string; // TODO

export type Gender = 'male' | 'female';
export enum Status {
	ONLINE,
	OFFLINE,
	BUSY,
	INVISIBLE,
	AWAY,
}
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export class ConfidentialityProfile {
	@Prop()
	all: ConfidentialityParams;
}

@Schema({ timestamps: true })
export class User {
	@Prop({
		unique: true,
		default: () => Math.floor(Math.random() * 900000000) + 100000000,
	})
	id: string;

	@Prop({ unique: true })
	email: string;

	@Prop({ unique: true })
	username: string;

	@Prop()
	passwordHash: string;

	@Prop()
	first: string;

	@Prop()
	last: string;

	@Prop()
	avatar?: string;

	@Prop()
	sex?: Gender;

	@Prop({ type: () => [String] })
	favorites: string[];

	@Prop({ type: () => [String] })
	history: string[];

	@Prop()
	confidentiality?: ConfidentialityProfile;

	@Prop({ type: () => [String] })
	roles?: UserRole[];

	@Prop()
	gameId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
