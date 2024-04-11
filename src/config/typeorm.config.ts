import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeormConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
	configService;
	console.log('test: ', process.env.USERNAME);
	return {
		type: 'mysql',
		host: process.env.HOSTNAME || 'localhost',
		port: parseInt(process.env.SQL_PORT) || 3306,
		username: process.env.USER || 'root',
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		entities: [],
		synchronize: true,
	};
};
