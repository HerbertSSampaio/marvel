import { Container, Grid, ImageList, ImageListItem, ImageListItemBar, Paper } from "@material-ui/core";
import { GetStaticProps } from "next";
import CharacterList from "../components/CharacterList";
import { api } from "../services/api";

type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

interface CharactersProps {
  characters: Character[];
}

export default function Home({ characters }:CharactersProps ) {
  return (
    <Container>
        <Grid container>
          <CharacterList characters={characters}/>
        </Grid>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const resultCharacters = await api.get(`/characters`, {
    params: {
      ts: process.env.MARVEL_TS,
      apikey: process.env.MARVEL_PUBLIC_KEY,
      hash: process.env.MARVEL_HASH_MD5,
    }
  });

  const characters = resultCharacters.data.data.results.map(character => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
    }
  });

  return {
    props: {
      characters,
    },
    revalidate: 60 * 60 * 24,
  };
}