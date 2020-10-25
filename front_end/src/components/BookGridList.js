import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core/';
import tileData from '../static/tileData';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'grey'
    },
    gridList: {
        width: '80%'
    },
    card: {
        maxWidth: 200
    },
    media: {
        height: 300
    },
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
            {tileData.map((tile) => (
                <Grid item>
                    <Card className={classes.card}><CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={require('../static/' + tile.img)}
                        />
                        <CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">
                            {tile.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea></Card>
                </Grid>
            ))}
            </Grid>
        </Grid>
    </Grid>
  );
}
