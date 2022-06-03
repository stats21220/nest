import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {index, prop} from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageAdvantage {
	@prop()
	title: string;
	@prop()
	description: string;
}

export class HhData {
	@prop()
	count: number;
	@prop()
	juniorSalary: number;
	@prop()
	middleSalary: number;
	@prop()
	seniorSalary: number;
}

export interface TopPageModel extends Base {
}


@index({title: 'text', seoText: 'text'})
export class TopPageModel extends TimeStamps {

	@prop({enum: TopLevelCategory})
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({unique: true})
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({type: () => [TopPageAdvantage]})
	advantages: TopPageAdvantage[];

	@prop({type: () => HhData})
	hh?: HhData;

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({type: () => [String]})
	tags: string[];
}
