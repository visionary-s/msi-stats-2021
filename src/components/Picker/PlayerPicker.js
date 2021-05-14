import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './PlayerPicker.module.css';
import { fetchPlayerList } from '../../api';


const PlayerPicker = ({ handlePlayerChange }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            setPlayers(await fetchPlayerList());
        };
        fetchPlayers();
    }, [setPlayers]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handlePlayerChange(event.target.value)}>
                <option value="">All Players</option>
                {players.map((player, i) => <option key={i} value={player}>{player}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default PlayerPicker;