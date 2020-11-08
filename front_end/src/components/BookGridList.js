import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core/';
import tileData from '../static/tileData';

const BookGridList = ({props, books}) => {
    console.log(books);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: 'burlywood'
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
    
    const classes = useStyles();
    let renderBooks;
    if(books === undefined)
    {
    renderBooks = (tileData.map((tile) => (
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
        ))
    )
    }

    else
    {
        renderBooks = <div>Books Loaded</div>
    }


  return (
    <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
                {renderBooks}
            </Grid>
        </Grid>
    </Grid>
  );
}

export default BookGridList;