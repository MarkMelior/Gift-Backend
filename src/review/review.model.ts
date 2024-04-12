import { TimeStamps } from 'src/app/lib/classes/timestamp';
import { UserModel } from 'src/user/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ReviewStatus {
	PENDING,
	ACCEPTED,
	REJECTED,
	MAIN,
}

@Entity('reviews')
export class ReviewModel extends TimeStamps {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column()
	rating: number; // TODO max 5 min 1

	@Column()
	comment: string;

	@Column({ default: ReviewStatus.PENDING, type: 'enum', enum: ReviewStatus })
	status: ReviewStatus;

	@ManyToOne(() => UserModel, (user) => user._id)
	userId: Pick<UserModel, '_id'>;
}
