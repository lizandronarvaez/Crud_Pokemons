import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
// Este validador hace que los datos que se introducen antes de la base de datos sean validados como se especifan si es numero, es entero, es positivo
export class CreatePokemonDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  no: number;
  @IsString()
  @MinLength(1)
  name: string;
}
