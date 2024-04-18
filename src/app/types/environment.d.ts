/* eslint-disable */

namespace NodeJS {
	interface ProcessEnv {
		PORT: string;

		MYSQL_LOGIN: string;
		MYSQL_PASSWORD: string;
		MYSQL_HOST: string;
		MYSQL_PORT: string;
		MYSQL_DATABASE: string;

		MONGO_LOGIN: string;
		MONGO_PASSWORD: string;
		MONGO_HOST: string;
		MONGO_PORT: string;
		MONGO_AUTHDATABASE: string;
	}
}
