import { ReviewModel } from 'src/review/review.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
	all: ConfidentialityParams;
}

@Entity('users')
export class UserModel {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	phone: string;

	@Column()
	first: string;

	@Column()
	last: string;

	@Column()
	age: number;

	@Column()
	country?: Country;

	@Column()
	city?: string;

	@Column({ unique: true })
	username: string;

	@Column()
	avatar?: string;

	@Column()
	sex: Gender;

	@Column({ default: Status.ONLINE, type: 'enum', enum: Status })
	status: Status;

	@Column({ type: 'simple-array' })
	favorites: number[];

	@Column({ type: 'simple-array' })
	history: number[];

	@Column()
	confidentiality?: ConfidentialityProfile;

	@Column()
	gameId?: number;

	@OneToMany(() => ReviewModel, (reviews) => reviews.userId)
	reviews?: ReviewModel[];
}
