import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ReviewStatus {
	PENDING,
	ACCEPTED,
	REJECTED,
	MAIN,
}

@Entity('reviews')
export class Review {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column()
	rating: number; // TODO max 5 min 1

	@Column()
	comment: string;

	@Column({ default: ReviewStatus.PENDING, type: 'enum', enum: ReviewStatus })
	status: ReviewStatus;

	@ManyToOne(() => User, (user) => user._id)
	user: User;
}
