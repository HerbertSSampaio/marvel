import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import React from "react";
import { api } from "../../services/api";

type Comic = {
    id: number;
    title: string;
    thumbnail: string;
    details: string;
}

type Serie = {
    name: string;
}

type Story = {
    name: string;
}

interface CharacterProps {
    character: {
        id: number;
        name: string;
        description: string;
        thumbnail: string;
        comics: Comic[];
        series: Serie[];
        stories: Story[];
    }
}

export default function Character({ character }: CharacterProps) {
    return (
        <>
            <Head>
                <title>{ character.name } | Marvel</title>
            </Head>
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

    const getCharacter = findCharacter.data.data.results[0]
    const getCharacterComic = findCharacterComic.data.data.results

    const character = {
        id: getCharacter.id,
        name: getCharacter.name,
        description: getCharacter.description,
        thumbnail: `${getCharacter.path}/portrait_uncanny.${getCharacter.extension}`,
        comics: getCharacterComic.map(comic => {
            return {
                id: comic.id,
                title: comic.title,
                thumbnail: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
                details: comic.urls[0].url,
            }
        }),
        series: {},
        stories: {},
    };

    return { 
        props: {
            character,
        },
        revalidate: 60 * 60 * 24,
    };
}