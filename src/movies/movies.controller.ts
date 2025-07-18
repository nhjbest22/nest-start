import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDTO } from './dto/update-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') movieYear: number): string {
    return `We are searching for a movie made after: ${movieYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMoviesDto): Movie {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number): { message: string } {
    return { message: this.moviesService.deleteOne(movieId) };
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMoviesDTO,
  ): Movie {
    return this.moviesService.updateOne(movieId, updateData);
  }
}
