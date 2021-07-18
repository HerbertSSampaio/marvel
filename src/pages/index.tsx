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
  const resultCharacters = await api.get("/characters?ts=stringgrande5&apikey=7bef0f712b879922a50fccaee6d20219&hash=85f5fed85ba5469fe2e7f2d0c6320874");

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