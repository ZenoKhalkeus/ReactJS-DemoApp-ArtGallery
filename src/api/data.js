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

    const search = async(id) =>{
        const result = await request.get(`${url}?where=title%20LIKE%20%22${id}%22`)
        return result
    }

    const like = async (artworkId) =>{
        const result = await request.post(`${baseUrl}/data/likes`,{
            artworkId
        })

        return result
    }

    const getNumberOfLikes = async(artworkId) =>{
        const result = await request.get(`${baseUrl}/data/likes?where=artworkId%3D%22${artworkId}%22&distinct=_ownerId&count`)
        console.log(result)
            return result
        }
    
    const getOwnLike = async(artworkId, userId) =>{
        const result = await request.get(`${baseUrl}/data/likes?where=artworkId%3D%22${artworkId}%22%20and%20_ownerId%3D%22${userId}%22&count`)

        return result
    }

    const edit = (artworkId, data) => request.put(`${url}/${artworkId}`, data);

    const deleteArtwork = (artworkId) => request.delete(`${url}/${artworkId}`);

    return {
        getAll,
        getOne,
        create,
        getOwn,
        search,
        like,
        getNumberOfLikes,
        getOwnLike,
        delete: deleteArtwork,
        edit

    }

}