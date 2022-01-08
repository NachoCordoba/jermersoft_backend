import { IPokemon, IPokemonDetail } from "./pokemon.interface";
import PokemonRepository from "./pokemon.repository";

export default class PokemonBussiness{
    private pokemonRepository: PokemonRepository;

    constructor(pokemonRepository: PokemonRepository = new PokemonRepository()){
        this.pokemonRepository = pokemonRepository;
    }

    public async getPaginatedPokemons(page: number, limit: number): Promise<any>{
        return await this.pokemonRepository.getPaginatedPokemons(page, limit);
    }

    public async getPokemonDetail(pokemonId: number | string): Promise<IPokemonDetail>{
        return this.pokemonRepository.getPokemonDetail(pokemonId);
    }
}