import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030'

const url = `${baseUrl}/data/artwork`

export const serviceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(url);
        const games = Object.values(result);
    
        return games;
    }

    return {
        getAll
    }

}