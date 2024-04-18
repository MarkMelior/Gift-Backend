import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Auth])],
	controllers: [AuthController],
})
export class AuthModule {}
