import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { randomBytes } from 'crypto';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	constructor() {}

	// * products
	async uploadProductImages(
		files: Express.Multer.File[],
		productArticle: string,
	) {
		const uploadedFiles: string[] = [];

		for (const file of files) {
			if (!file.mimetype.includes('image')) {
				// uploadedFiles.push({
				// 	name: file.originalname,
				// 	error: INVALID_IMAGE_FILE_TYPE,
				// } as Files);
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

	// * utils
	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
