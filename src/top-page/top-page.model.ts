export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageModel {
	firstCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	advantages: {
		title: string
		description: string
	}[];
	hh?: {
		count: number,
		juniorSalary: number,
		middleSalary: number,
		seniorSalary: number
	};
	seoText: string;
	tagsTitle: string;
	tags: string[];
}
