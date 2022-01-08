import { Request, Response} from 'express';
import PokemonBussiness from './pokemon.bussiness';
import { IPokemon, IPokemonDetail} from './pokemon.interface';

export default class PokemonController{
    private pokemonBussiness: PokemonBussiness;

    constructor(pokemonBussiness: PokemonBussiness = new PokemonBussiness()){
        this.pokemonBussiness = pokemonBussiness;
    }

    public getPaginatedPokemons = async (req: Request, res: Response)=>{
        const { page = 1, limit = 10} = req.query;

        try{
            return res.status(200).json(await this.pokemonBussiness.getPaginatedPokemons(Number(page), Number(limit)));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }

    public getPokemonDetail = async (req: Request, res: Response)=>{
        const { id } = req.params;

        let pokemon : number | string = Number(id);

        if(isNaN(pokemon))
            pokemon = String(id)

        try{
            return res.status(200).json(await this.pokemonBussiness.getPokemonDetail(pokemon));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }
}