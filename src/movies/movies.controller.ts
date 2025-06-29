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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') movieYear: string) {
    return `We are searching for a movie made after: ${movieYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return a movie with ID: ${movieId}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return `This will delete a movie with ID: ${movieId}`;
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovieId: movieId,
      ...updateData,
    };
  }
}
