import {IsNumber, IsString, IS_ENUM, IsEnum, IsArray, ValidateNested, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';
import {TopLevelCategory} from '../top-page.model';

export class TopPageAdvantage {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantage)
	advantages: TopPageAdvantage[];

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({each: true})
	tags: string[];
}
