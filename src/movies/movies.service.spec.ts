import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of movies', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array<Movie>);
    });
  });

  describe('getOne', () => {
    it('should return a movie by id', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Drama', 'Action'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
    });

    it('should throw 404 error if movie not found', () => {
      expect(() => service.getOne(999)).toThrow(NotFoundException);
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie by id', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Drama', 'Action'],
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
      expect(() => service.getOne(1)).toThrow(NotFoundException);
    });

    it('should throw 404 error if movie not found', () => {
      expect(() => service.deleteOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Drama', 'Action'],
      });
      const afterCreate = service.getAll().length;

      // expect(afterCreate).toBe(beforeCreate + 1);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateOne', () => {
    it('should update a movie by id', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Drama', 'Action'],
      });

      const updatedData = { title: 'Updated Movie' };
      service.updateOne(1, updatedData);
      const updatedMovie = service.getOne(1);

      expect(updatedMovie.title).toEqual('Updated Movie');
    });

    it('should throw 404 error if movie not found for update', () => {
      expect(() => service.updateOne(999, { title: 'Updated Movie' })).toThrow(
        NotFoundException,
      );
    });
  });
});
