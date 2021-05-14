import React from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './TeamPicker.module.css';


const TeamPicker = () => {

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="">
                <option value="">All Teams</option>
            </NativeSelect>
        </FormControl>
    );
};

export default TeamPicker;