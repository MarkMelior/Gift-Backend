import { TimeStamps } from 'src/app/lib/classes/timestamp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthModel extends TimeStamps {
	@PrimaryGeneratedColumn()
	_id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	passwordHash: string;
}
