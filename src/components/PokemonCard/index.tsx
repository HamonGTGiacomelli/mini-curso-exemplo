import {PokemonDetails} from '../../api/types';
import axios from 'axios';
import React, {useEffect} from 'react';
import './styles.scss';

type Props = {
    pokemon: PokemonDetails;
};

const PokemonCard: React.FC<Props> = ({pokemon}) => {
    useEffect(() => {
        axios.get(``);
    }, []);

    const {name: pokemonName, sprites, stats} = pokemon;
    const {front_default} = sprites;

    return (
        <div className="pokemonCardWrapper">
            <div className="title">{pokemonName}</div>
            <div className="imageContainer">
                <img src={front_default} />
            </div>
            <div className="stats">
                {stats.map((status) => {
                    const {base_stat, stat} = status;
                    const {name: statName} = stat;
                    return (
                        <div
                            key={`${pokemonName}_${statName}`}>{`${statName} : ${base_stat}`}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default PokemonCard;
