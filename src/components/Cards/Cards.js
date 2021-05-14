import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';


const Cards = ( {data} ) => {

    console.log("anchor:", data);
    let highRecord = {"lp": 0};

    // const filterRecord = (data) => {
        data.forEach(record => {
            if (record.lp > highRecord.lp) {
                highRecord = record;
            }
        });
    // };
    

    return (
        <div className={styles.card}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={styles.card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{highRecord.team}</Typography>
                        <Typography variant="h5">
                            {highRecord.name}
                        </Typography>
                        <Typography color="textSecondary">{highRecord.role}</Typography>
                        <Typography color="textPrimary">{highRecord.summoner}</Typography>
                        <Typography variant="body2">#{highRecord.rankNum} {highRecord.rankHigh} {highRecord.lp} {highRecord.winper}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
};

export default Cards;