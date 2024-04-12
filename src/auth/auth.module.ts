import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';

@Module({
	imports: [TypeOrmModule.forFeature([AuthModel])],
	controllers: [AuthController],
})
export class AuthModule {}
