export interface IPokemonName {
    name: String;
}

export interface IPokemon extends IPokemonName{
    image: String;
    types: Array<String>;
    weight: Number;
    abilities: Array<String>;
};

export interface IPokemonDetail extends IPokemon{
    moves: Array<String>;
}

