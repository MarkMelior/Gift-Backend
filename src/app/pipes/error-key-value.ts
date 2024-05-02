import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	UnprocessableEntityException,
	ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ErrorKeyValueValidationPipe implements PipeTransform<any> {
	private readonly validationPipe: ValidationPipe;

	constructor() {
		this.validationPipe = new ValidationPipe({
			transform: true,
			exceptionFactory: (errors) => {
				const formattedErrors = {};
				errors.forEach((error) => {
					formattedErrors[error.property] = Object.values(error.constraints);
				});
				return new UnprocessableEntityException({
					statusCode: 422,
					error: 'Unprocessable Entity',
					message: formattedErrors,
				});
			},
		});
	}

	transform(value: any, metadata: ArgumentMetadata) {
		return this.validationPipe.transform(value, metadata);
	}
}
