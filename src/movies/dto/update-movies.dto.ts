import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesDto } from './create-movies.dto';

export class UpdateMoviesDTO extends PartialType(CreateMoviesDto) {}
