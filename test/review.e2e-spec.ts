import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {CreateReviewDto} from '../src/review/dto/create-review.dto';
import {Types, disconnect} from 'mongoose';
import {REVIEW_NOT_FOUND} from '../src/review/review.constants';
import {AuthDto} from '../src/auth/dto/auth.dto';

const loginDTO: AuthDto = {
	login: 'stas@mail.com',
	password: '123'
};

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'test2',
	title: 'попытка2',
	description: '',
	rating: 5,
	productId
};

let token: string;


describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async() => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		const {body} = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDTO);
		token = body.access_token;
	});


	// @ts-ignore
	it('/review/create (POST) - success', async() => {
		return request(app.getHttpServer())
			.post('/review/create')
			.set('Authorization', 'Bearer ' + token)
			.send(testDto)
			.expect(201)
			.then(({body}: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - fail', async() => {
		return request(app.getHttpServer())
			.post('/review/create')
			.set('Authorization', 'Bearer ' + token)
			.send({...testDto, rating: 's'})
			.expect(400)
			.then(({body}: request.Response) => {
				console.log(body);
			});
	});

	it(`/review/byProduct/:productId (GET) - success`, async() => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({body}: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it(`/review/byProduct/:productId (GET) - fail`, async() => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({body}: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it(`/review/:id (DELETE) - success`, () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it(`/review/:id (DELETE) - fail`, () => {
		return request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND
			});
	});
	afterAll(() => {
		disconnect();
	});
});
