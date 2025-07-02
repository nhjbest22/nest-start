import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to the NestJS application!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          genres: ['test'],
          // 누락된 필드로 인해 400 에러가 발생
        })
        .expect(400);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Movie with ID 9999 not found');
        });
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);
      const movieId = res.body.id;
      return await request(app.getHttpServer())
        .get(`/movies/${movieId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Test Movie');
          expect(res.body.year).toBe(2023);
          expect(res.body.genres).toEqual(['test']);
        });
    });

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/9999')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Movie with ID 9999 not found');
        });
    });

    it('DELETE 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);
      const movieId = res.body.id;
      return await request(app.getHttpServer())
        .delete(`/movies/${movieId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe(`Movie with ID ${movieId} deleted`);
        });
    });

    it('DELETE 404', async () => {
      await request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Movie with ID 9999 not found');
        });
    });

    it('PATCH 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);
      const movieId = res.body.id;
      return await request(app.getHttpServer())
        .patch(`/movies/${movieId}`)
        .send({ title: 'Updated Movie' })
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Updated Movie');
          expect(res.body.year).toBe(2023);
          expect(res.body.genres).toEqual(['test']);
        });
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/9999')
        .send({ title: 'Updated Movie' })
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Movie with ID 9999 not found');
        });
    });

    it('PATCH 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);

      const movieId = res.body.id;
      return request(app.getHttpServer())
        .patch(`/movies/${movieId}`)
        .send({ name: '' }) // 존재하지 않는 필드로 인해 400 에러가 발생
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('property name should not exist');
        });
    });
  });
});
