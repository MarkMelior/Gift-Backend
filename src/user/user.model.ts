import { Currency } from 'src/product/product.model';

export type Country = string; // TODO

export type Gender = 'male' | 'female';
export type Status = 'online' | 'offline' | 'busy' | 'invisible' | 'away';
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export interface ConfidentialityProfile {
	all: ConfidentialityParams;
}

export class UserModel {
	_id: number;
	email: string;
	phone: string;
	first: string;
	last: string;
	age: number;
	currency: Currency;
	country: Country;
	city: string;
	username: string;
	avatar: string;
	sex: Gender;
	status: Status;
	favorites: number[];
	history: number[];
	confidentiality?: ConfidentialityProfile;
	gameId?: number;
}
