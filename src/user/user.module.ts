import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
	imports: [TypeOrmModule.forFeature([UserModel])],
	controllers: [UserController],
})
export class UserModule {}
