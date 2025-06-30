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

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') movieYear: string) {
    return `We are searching for a movie made after: ${movieYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.updateOne(movieId, updateData);
  }
}
