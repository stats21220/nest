import {IsString, IsNumber, Max, Min} from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, {message: 'Рейтинг не может быть более 5'})
	@Min(1, {message: 'Рейтинг не может быть менее 1'})
	@IsNumber(undefined, {message: 'Рейтинг должен быть числом'})
	rating: number;

	@IsString()
	productId: string;
}
