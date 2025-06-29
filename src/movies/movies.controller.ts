import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return a movie with ID: ${movieId}`;
  }

  @Post(':id')
  createMovie(@Param('id') movieId: string) {
    return `This will create a new movie with Id: ${movieId}`;
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return `This will delete a movie with ID: ${movieId}`;
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string) {
    return `This will update a movie with ID: ${movieId}`;
  }
}
