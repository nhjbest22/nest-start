import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDTO } from './dto/update-movies.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: Number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: Number): string {
    this.getOne(id); // This will throw an error if the movie does not exist
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return `Movie with ID ${id} deleted`;
  }

  create(movieData: CreateMoviesDto): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return this.movies[this.movies.length - 1];
  }

  updateOne(id: Number, updateData: UpdateMoviesDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
