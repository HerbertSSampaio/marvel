import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../../services/api";

import { useStyles } from './styles';

type Comic = {
    id: number;
    title: string;
    thumbnail: string;
    details: string;
}

type Serie = {
    id: number;
    title: string;
    thumbnail: string;
    details: string;
}

type Event = {
    id: number;
    title: string;
    thumbnail: string;
    details: string;
}

interface CharacterProps {
    character: {
        id: number;
        name: string;
        description: string;
        thumbnail: string;
        comics: Comic[];
        series: Serie[];
        events: Event[];
    }
}

export default function Character({ character }: CharacterProps) {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>{ character.name } | Marvel</title>
            </Head>
            <Container className={classes.root}>
                <Grid container spacing={5} className={classes.header}>
                    <Grid item md={3}>
                        <Image src={character.thumbnail} width="300" height="450" alt={character.name} />
                    </Grid>
                    <Grid item md={9}>
                        <Typography variant="h1" noWrap>
                            {character.name}
                        </Typography>
                        <Typography variant="body1">
                            {character.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={5} className={classes.comic}>
                    <Grid xs={12}>
                        <Typography variant="h2" noWrap>
                            Comics
                        </Typography>
                    </Grid>
                    <Grid container spacing={4} className={classes.cardList}>
                        {character.comics.map((comic) => (
                            <Grid key={comic.id} item xs={2}>
                                <Card className={classes.card}>
                                    <div>
                                        <CardMedia>
                                            <Image src={comic.thumbnail} width="300" height="450" alt={comic.title} />
                                        </CardMedia>
                                    </div>
                                    <div>
                                        <CardContent className={classes.cardDescription}>
                                            <Typography variant="body2">
                                                {comic.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link href={comic.details} passHref={true}>
                                            <Button variant="contained" color="secondary" className={classes.cardButton}>Learn More</Button>
                                            </Link>
                                        </CardActions>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
            </Container>

        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { characterId: '1' } },
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const { characterId } = params;

    const findCharacter = await api.get(`/characters/${characterId}?ts=stringgrande5&apikey=7bef0f712b879922a50fccaee6d20219&hash=85f5fed85ba5469fe2e7f2d0c6320874`);
    const findCharacterComic = await api.get(`/characters/${characterId}/comics?ts=stringgrande5&apikey=7bef0f712b879922a50fccaee6d20219&hash=85f5fed85ba5469fe2e7f2d0c6320874`);
    const findCharacterSerie = await api.get(`/characters/${characterId}/series?ts=stringgrande5&apikey=7bef0f712b879922a50fccaee6d20219&hash=85f5fed85ba5469fe2e7f2d0c6320874`);
    const findCharacterEvent = await api.get(`/characters/${characterId}/events?ts=stringgrande5&apikey=7bef0f712b879922a50fccaee6d20219&hash=85f5fed85ba5469fe2e7f2d0c6320874`);



    const getCharacter = findCharacter.data.data.results[0]
    const getCharacterComic = findCharacterComic.data.data.results
    const getCharacterSerie = findCharacterSerie.data.data.results
    const getCharacterEvent = findCharacterEvent.data.data.results

    const character = {
        id: getCharacter.id,
        name: getCharacter.name,
        description: getCharacter.description,
        thumbnail: `${getCharacter.thumbnail.path}/portrait_uncanny.${getCharacter.thumbnail.extension}`,
        comics: getCharacterComic.map(comic => {
            return {
                id: comic.id,
                title: comic.title,
                thumbnail: `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`,
                details: comic.urls[0].url,
            }
        }),
        series: getCharacterSerie.map(serie => {
            return {
                id: serie.id,
                title: serie.title,
                thumbnail: `${serie.thumbnail.path}/portrait_xlarge.${serie.thumbnail.extension}`,
                details: serie.urls[0].url
            }
        }),
        events: getCharacterEvent.map(event => {
            return {
                id: event.id,
                title: event.title,
                thumbnail: `${event.thumbnail.path}/portrait_xlarge.${event.thumbnail.extension}`,
                details: event.urls[0].url
            }
        }),
    };

    return { 
        props: {
            character,
        },
        revalidate: 60 * 60 * 24,
    };
}