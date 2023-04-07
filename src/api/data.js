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
    const getOne = async (id) =>{
        const result = await request.get(`${url}/${id}`)
        return result
    }

    const create = async(data) => {
        const result = await request.post(url, data)

        return result
    }

    const getOwn = async(id) =>{
        const result = await request.get(`${url}?where=_ownerId%20LIKE%20%22${id}%22`)
        return result
    }


    return {
        getAll,
        getOne,
        create,
        getOwn
    }

}