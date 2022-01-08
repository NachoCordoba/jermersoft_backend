import axios from 'axios';
import { IPokemon, IPokemonDetail, IPokemonName } from './pokemon.interface';

export default class PokemonRepository{
    constructor(){

    }

    public async getPaginatedPokemons(page: number, limit: number): Promise<{
        count: number,
        data: Array<IPokemon>
    }>{
        let offset = page * limit;
        try{
            let resultFromApi = await (await axios.get(`${process.env.POKEMON_SERVICE_URI}?limit=${limit}&offset=${offset}`)).data;

            let pokemonsFromApi = resultFromApi.results;
            let pokemons = [];

            for(let i = 0; i < pokemonsFromApi.length ;i++){
                let pokemonDetailFromApi = await this.getPokemonDetail(pokemonsFromApi[i].name)
                pokemons.push({
                    name: pokemonDetailFromApi.name,
                    image: pokemonDetailFromApi.image,
                    types: pokemonDetailFromApi.types,
                    weight: pokemonDetailFromApi.weight,
                    abilities: pokemonDetailFromApi.abilities
                });
            }

            return {
                count: resultFromApi.count,
                data: pokemons
            };
        }
        catch(err: any){
            throw new Error(err);
        }
    }

    public async getPokemonDetail(pokemon: number | string): Promise<IPokemonDetail>{
        let pokemonDetailFromApi = await (await axios.get(`${process.env.POKEMON_SERVICE_URI}/${pokemon}`)).data; 

        return {
            name: pokemonDetailFromApi.name,
            image: pokemonDetailFromApi.sprites.front_default,
            types: pokemonDetailFromApi.types.map((slot: any) => slot.type.name),
            weight: pokemonDetailFromApi.weight,
            abilities: pokemonDetailFromApi.abilities.map((slot: any) => slot.ability.name),
            moves: pokemonDetailFromApi.moves.map((slot: any)=> slot.move.name)
        };
    }
}