import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
	private readonly refreshTokens: Map<string, string> = new Map(); // ! In-memory storage, используйте БД для production

	constructor(private readonly jwtService: JwtService) {}

	generateRefreshToken(userId: string): string {
		const refreshToken = this.jwtService.sign(
			{ userId },
			{
				secret: process.env.REFRESH_SECRET,
				expiresIn: '7d',
			},
		);
		this.refreshTokens.set(refreshToken, userId.toString());
		return refreshToken;
	}

	validateRefreshToken(token: string): number | null {
		try {
			const { userId } = this.jwtService.verify(token, {
				secret: process.env.REFRESH_SECRET,
			});
			if (this.refreshTokens.has(token)) {
				return userId;
			}
			return null;
		} catch (e) {
			return null;
		}
	}

	revokeRefreshToken(token: string): void {
		this.refreshTokens.delete(token);
	}
}
