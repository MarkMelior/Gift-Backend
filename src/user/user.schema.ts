import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

	@Prop({ type: () => [Number] })
	favorites: number[];

	@Prop({ type: () => [Number] })
	history: number[];

	@Prop()
	confidentiality?: ConfidentialityProfile;

	// * for game
	// @Prop({ default: Status.ONLINE, type: () => Number, enum: Status })
	// status: Status;

	@Prop()
	gameId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
