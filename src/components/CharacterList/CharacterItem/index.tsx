import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import Image from 'next/image';
import Link from 'next/link'
import { useStyles } from './styles';

type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
}

export default function CharacterItem({ id, name, description, thumbnail }: Character ) {
    const classes = useStyles();

    return (
            <Grid item xs={6} sm={4} md={3} className={classes.root}>
                <Card>
                    <CardMedia>
                        <Image src={thumbnail} width="300" height="450" alt={name} />
                    </CardMedia>
                    <CardContent className={classes.content}>
                        <Typography variant="h2" className={classes.cardTitle} noWrap>
                            {name}
                        </Typography>
                        <Typography variant="body1" className={classes.cardDescription}>
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link  href={`/characters/${id}`} passHref>
                            <Button variant="contained" color="secondary" className={classes.cardButton}>Learn More</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
    )
}

