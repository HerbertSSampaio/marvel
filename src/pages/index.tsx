import { CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import CharacterList from "../components/CharacterList";
import Pagination from "../components/Pagination";
import { api } from "../services/api";
import { useStyles } from "./home.styles";

type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

type Pagination = {
  totalPages: number;
  totalResults: number;
}

interface CharactersProps {
  initialCharacters: Character[];
  initialPagination: Pagination;
}

export default function Home({ initialCharacters, initialPagination }:CharactersProps ) {
  const classes = useStyles();

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [pagination, setPagination] = useState(initialPagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNewCharacters(): Promise<void> {
      if(currentPage === 0 || currentPage > pagination.totalPages) {
        return;
      }
      const newCharacters = await axios.get("api/characters", {
        params: {
          currentPage,
        }
      }).then((response) => response.data);
    
      setCharacters(newCharacters);
      setIsLoading(false);
    };

    loadNewCharacters()
  },[currentPage, pagination]);

  return (
    <>
      <Container>
          <Pagination 
            pages={Array.from(Array(pagination.totalPages).keys())} 
            setCurrentPage={setCurrentPage} 
            activePage={currentPage} 
            setIsLoading={setIsLoading} 
            totalItens={pagination.totalResults}
          />
          <Grid container className={classes.root}>
            {
              isLoading ? (
                <CircularProgress className={classes.spinner} />
              ) : (
                <CharacterList characters={characters}/>
              )
            }
          </Grid>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const resultCharacters = await api.get(`/characters`, {
    params: {
      limit: 60,
      ts: process.env.MARVEL_TS,
      apikey: process.env.MARVEL_PUBLIC_KEY,
      hash: process.env.MARVEL_HASH_MD5,
    }
  }).then(response => (response.data.data));

  const initialPagination = {
    totalPages: Math.ceil(resultCharacters.total / resultCharacters.count),
    totalResults: resultCharacters.total,
  }

  const initialCharacters = resultCharacters.results.map(character => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
    }
  });

  return {
    props: {
      initialCharacters,
      initialPagination
    },
    revalidate: 60 * 60 * 24,
  };
}