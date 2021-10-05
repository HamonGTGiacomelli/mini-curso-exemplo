import {PokemonDetails} from '../../api/types';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './styles.scss';

type Props = {
    pokemon: PokemonDetails;
};

const PokemonCard: React.FC<Props> = ({pokemon}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        axios.get(``);
    }, []);

    const {name: pokemonName, sprites, stats} = pokemon;
    const {front_default} = sprites;

    return (
        <div className="pokemonCardWrapper">
            <div className="title">{pokemonName.toUpperCase()}</div>

            <div className="imageContainer">
                <img
                    src={front_default}
                    onLoad={() => setIsImageLoading(false)}
                />
                {isImageLoading ? <span>Loading...</span> : null}
            </div>
            <div className="stats">
                {stats.map((status) => {
                    const {base_stat, stat} = status;
                    const {name: statName} = stat;
                    return (
                        <div
                            className="stat"
                            key={`${pokemonName}_${statName}`}>
                            <span>{statName.toUpperCase()}</span>
                            <span>{base_stat}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PokemonCard;
