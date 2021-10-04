export interface PokemonListResponse {
    count: number;
    next?: string;
    previous?: string;
    results: Pokemon[];
}

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    name: string;
    sprites: {
        back_default: string;
        front_default: string;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}
