import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {disconnect} from 'mongoose';
import {AuthDto} from '../src/auth/dto/auth.dto';

const loginDTO: AuthDto = {
	login: 'stas@mail.com',
	password: '123'
};


describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async() => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it(`/auth/login (POST) - success`, async() => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDTO)
			.expect(200)
			.then(({body}: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it(`/auth/login (POST) - fail login`, () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDTO, login: 'error@mail.com'})
			.expect(401, {
				statusCode: 401,
				message: 'Пользоваетель с таким email не найден',
				error: 'Unauthorized'
			});
	});

	it(`/auth/login (POST) - fail password`, () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDTO, password: '666'})
			.expect(401, {
				statusCode: 401,
				message: 'не верный пароль',
				error: 'Unauthorized'
			});
	});

	afterAll(() => {
		disconnect();
	});
});
