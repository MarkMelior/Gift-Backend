import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/app/contracts';

export const ACCESS_ROLES_KEY = 'accessRoles';

export const UseRoles = (...roles: UserRole[]) =>
	SetMetadata(ACCESS_ROLES_KEY, roles);
