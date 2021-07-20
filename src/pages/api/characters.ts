import { api } from "../../services/api";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { currentPage, characterName } = req.query;

    if(characterName === undefined || characterName.length === 0) {
        const responseCharacters = await api.get(`/characters`, {
            params: {
                offset: (Number(currentPage) - 1) * 60,
                limit: 60,
                ts: process.env.MARVEL_TS,
                apikey: process.env.MARVEL_PUBLIC_KEY,
                hash: process.env.MARVEL_HASH_MD5,
            }
        }).then(response => (response.data.data));

        const Pagination = {
            totalPages: Math.ceil(responseCharacters.total / responseCharacters.count),
            totalResults: responseCharacters.total,
        }

        const newCharacters = responseCharacters.results.map(character => {
            return {
                id: character.id,
                name: character.name,
                description: character.description,
                thumbnail: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
            }
        });
    
        const response = [Pagination, newCharacters]

        res.status(200).json(response)
    } else {
        const responseCharacters = await api.get(`/characters`, {
            params: {
                offset: (Number(currentPage) - 1) * 60,
                limit: 60,
                nameStartsWith: characterName,
                ts: process.env.MARVEL_TS,
                apikey: process.env.MARVEL_PUBLIC_KEY,
                hash: process.env.MARVEL_HASH_MD5,
            }
        }).then(response => (response.data.data));

        const Pagination = {
            totalPages: Math.ceil(responseCharacters.total / responseCharacters.count),
            totalResults: responseCharacters.total,
        }


        const newCharacters = responseCharacters.results.map(character => {
            return {
                id: character.id,
                name: character.name,
                description: character.description,
                thumbnail: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
            }
        });

        const response = [Pagination, newCharacters]

        res.status(200).json(response)
    }
}