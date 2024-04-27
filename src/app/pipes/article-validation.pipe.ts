import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ArticleValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') return value;

		// Проверяем, что значение состоит ровно из 9 цифр
		if (!/^\d{9}$/.test(value)) {
			throw new BadRequestException(
				'Невалидный Article. Он должен содержать 9 цифр',
			);
		}

		return value;
	}
}
