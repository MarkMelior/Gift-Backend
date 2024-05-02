import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { path } from 'app-root-path';
import { randomBytes } from 'crypto';
import { ensureDir, writeFile } from 'fs-extra';
import { rmdir, unlink } from 'fs/promises';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	constructor() {}

	async uploadProductImages(
		files: Express.Multer.File[],
		productArticle: string,
	) {
		const uploadedFiles: string[] = [];

		for (const file of files) {
			if (!file.mimetype.includes('image')) {
				// todo error
				continue;
			}

			const uploadFolder = `${path}/uploads/products/${productArticle}`;
			await ensureDir(uploadFolder);

			const randomNumber = randomBytes(4).readUInt32BE(0);
			const fileName = `${randomNumber}.webp`;

			if (!file.mimetype.includes('image/webp')) {
				const buffer = await this.convertToWebP(file.buffer);
				await writeFile(`${uploadFolder}/${fileName}`, buffer);
			} else {
				await writeFile(`${uploadFolder}/${fileName}`, file.buffer);
			}

			uploadedFiles.push(fileName);
		}

		return uploadedFiles;
	}

	async deleteProductImages(productArticle: string, images: string[]) {
		const deleteFolder = `${path}/uploads/products/${productArticle}`;

		for (const imageName of images) {
			const imagePath = `${deleteFolder}/${imageName}`;

			try {
				await unlink(imagePath);
			} catch (error) {
				throw new ForbiddenException(`Не удалось удалить файл ${imagePath}`);
			}
		}

		return images;
	}

	async deleteAllProductImages(productArticle: string) {
		const deleteFolder = `${path}/uploads/products/${productArticle}`;

		try {
			await rmdir(deleteFolder);
		} catch (error) {
			if (error.code === 'ENOENT') {
				throw new NotFoundException(
					`Папка с изображениями продукта ${productArticle} не найдена`,
				);
			} else {
				throw new InternalServerErrorException(
					`Не удалось удалить изображения продукта ${productArticle}`,
				);
			}
		}
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
