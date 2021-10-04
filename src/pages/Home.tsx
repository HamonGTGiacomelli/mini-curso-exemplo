import {PokemonDetails, PokemonListResponse} from '../api/types';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import PokemonCard from '../components/PokemonCard';
import './styles.scss';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios
            .get<PokemonListResponse>(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    page * ITEMS_PER_PAGE
                }&limit=${ITEMS_PER_PAGE}`,
            )
            .then(async (response) => {
                const {data} = response;
                const {results} = data;
                const detailsPromisses = results.map((pokemon) => {
                    const {url} = pokemon;
                    return axios.get<PokemonDetails>(url);
                });
                const allPokemonDetails = (
                    await Promise.all(detailsPromisses)
                ).map((pokemonDetailsResponse) => {
                    return pokemonDetailsResponse.data;
                });
                console.log({allPokemonDetails});
                setPokemonList(allPokemonDetails);
            });
    }, [page]);

    return (
        <div className="homePage">
            <div className="cardsWrapper">
                {pokemonList.map((pokemon) => {
                    const {name} = pokemon;
                    return <PokemonCard key={name} pokemon={pokemon} />;
                })}
            </div>
            <div className="navigationWrapper">
                <button
                    onClick={() => {
                        setPage(page - 1);
                    }}>
                    Anterior
                </button>
                <span>{page + 1}</span>
                <button
                    onClick={() => {
                        setPage(page + 1);
                    }}>
                    Proximo
                </button>
            </div>
        </div>
    );
};

export default Home;
