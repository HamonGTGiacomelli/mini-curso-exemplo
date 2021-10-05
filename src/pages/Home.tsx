import {PokemonDetails, PokemonListResponse} from '../api/types';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import PokemonCard from '../components/PokemonCard';
import './styles.scss';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        axios
            .get<PokemonListResponse>(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    page * ITEMS_PER_PAGE
                }&limit=${ITEMS_PER_PAGE}`,
            )
            .then(async (response) => {
                const {data} = response;
                const {results, count} = data;
                setMaxPage(Math.ceil(count / ITEMS_PER_PAGE) - 1);
                const detailsPromisses = results.map((pokemon) => {
                    const {url} = pokemon;
                    return axios.get<PokemonDetails>(url);
                });
                const allPokemonDetails = (
                    await Promise.all(detailsPromisses)
                ).map((pokemonDetailsResponse) => {
                    return pokemonDetailsResponse.data;
                });
                setPokemonList(allPokemonDetails);
                setIsPageLoading(false);
            });
    }, [page]);

    console.log({maxPage});

    return (
        <div className="homePage">
            {isPageLoading ? (
                <div className="pageLoadingContainer">
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="cardsWrapper">
                    {pokemonList.map((pokemon) => {
                        const {name} = pokemon;
                        return <PokemonCard key={name} pokemon={pokemon} />;
                    })}
                </div>
            )}
            <div className="navigationWrapper">
                <button
                    disabled={page <= 0}
                    onClick={() => {
                        setIsPageLoading(true);
                        setPage(0);
                    }}>
                    Primeira
                </button>
                <button
                    disabled={page <= 0}
                    onClick={() => {
                        setIsPageLoading(true);
                        setPage(page - 1);
                    }}>
                    Anterior
                </button>
                <span className="pageNumber">{page + 1}</span>
                <button
                    disabled={page >= maxPage}
                    onClick={() => {
                        setIsPageLoading(true);
                        setPage(page + 1);
                    }}>
                    Proximo
                </button>
                <button
                    disabled={page >= maxPage}
                    onClick={() => {
                        setIsPageLoading(true);
                        setPage(maxPage);
                    }}>
                    Ultimo
                </button>
            </div>
        </div>
    );
};

export default Home;
