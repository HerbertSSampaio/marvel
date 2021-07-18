import { Grid } from "@material-ui/core";
import CharacterItem from "./CharacterItem";

type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
}

interface CharactersProps {
    characters: Character[];
}

export default function CharacterList({ characters }: CharactersProps ) {
    return (
        <Grid container spacing={5}>
        {characters.map((character) => (
            <CharacterItem 
                key={character.id} 
                id={character.id} 
                name={character.name} 
                description={character.description} 
                thumbnail={character.thumbnail} 
            />

        ))}
        </Grid>
    )
}

