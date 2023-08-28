import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // Constructor para la inyeccion de datos en la base de datos
  constructor(
    // Modelo de inyeccion
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}
  async executedSeed() {
    // Borrar las inserciones en la base de datos
    await this.pokemonModel.deleteMany({});
    // Numeros de pokemons
    const pokemon = 20;
    // Array de objetos para almacernar los pokemons
    const insertPoke: { name: string; no: number }[] = [];
    // Peticion de los pokemon
    const data = await this.http.get<PokemonResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemon}`,
    );
    // Por cada uno de los pokemons extraigo el nombre y el numero
    data.results.forEach(({ name, url }) => {
      // Aplico un split para separar
      const segments = url.split('/');
      // Obtengo el numero del pokemon tambien puedo aplicar con slice
      const no: number = +segments[segments.length - 2];
      // inserto el pokemon con los datos que quiero almacenar
      insertPoke.push({ name, no });
    });
    // Realizo insercion de los pokemon en la base de datos
    await this.pokemonModel.insertMany(insertPoke);
    // Envio una respuesta de confirmacion de insercion
    return `Pokemon insertados en la base de datos correctamente`;
  }
}
