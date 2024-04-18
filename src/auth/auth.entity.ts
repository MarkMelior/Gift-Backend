import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamps } from '../app/lib/classes/timestamp';

@Entity()
export class Auth extends TimeStamps {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	passwordHash: string;
}
