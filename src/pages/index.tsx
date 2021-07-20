import { Button, ButtonGroup, CircularProgress, Container, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import CharacterList from "../components/CharacterList";
import Pagination from "../components/Pagination";
import { api } from "../services/api";
import { useStyles } from "./styles";

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
  const [isLoading, setIsLoading] = useState(false);
  const [characterName, setCharacterName] = useState('');

  function handleSubmit() {
    setCurrentPage(1);
    setIsLoading(true);
    loadNewCharacters(characterName, 1);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSubmit()
      event.preventDefault();
    }
  }

  function handleClear() {
    setCharacterName('');
    setCurrentPage(1);
    setIsLoading(true);
    loadNewCharacters('', 1);
  }

  function handlePage(pageNumber): void {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    loadNewCharacters(characterName, pageNumber);
  }

  async function loadNewCharacters(name: string, pageNumber: number): Promise<void> {
    if(currentPage === 0 || currentPage > pagination.totalPages) {
      return;
    }
    const response = await axios.get("api/characters", {
      params: {
        currentPage: pageNumber,
        characterName: name,
      }
    }).then((response) => response.data);

    const newCharacters = response[1];
    const newPagination = response[0];
    
    setCharacters(newCharacters);
    setPagination(newPagination);
    setIsLoading(false);
  };

  return (
    <>
      <Grid 
        component="header" 
        container 
        justifyContent="center" 
        className={classes.form}
      >
        <form>
          <TextField 
            color="secondary" 
            label="Character Name" 
            value={characterName} 
            onChange={event => setCharacterName(event.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
          />
          <ButtonGroup 
            aria-label="contained button group" 
            variant="contained" 
            className={classes.buttonGroup}
          >
            <Button 
              color="primary" 
              onClick={() => handleSubmit()}
            >
              Search
            </Button>
            <Button 
              color="secondary" 
              onClick={() => handleClear()}
            >
              Clear
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
      <Container>
          <Pagination 
            pages={Array.from(Array(pagination.totalPages).keys())} 
            handlePage={handlePage} 
            activePage={currentPage} 
            totalItens={pagination.totalResults}
          />
          <Grid container className={classes.cards}>
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