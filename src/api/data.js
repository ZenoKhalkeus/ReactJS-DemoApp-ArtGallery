import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030'

const url = `${baseUrl}/data/artwork`

const jobUrl = `${baseUrl}/data/job`

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

    // Jobs

    const getAllJobs = async () => {
        const result = await request.get(jobUrl);
        const games = Object.values(result);
    
        return games;
    }
    const getOneJob = async (id) =>{
        const result = await request.get(`${jobUrl}/${id}`)
        return result
    }

    const createJob = async(data) => {
        const result = await request.post(jobUrl, data)

        return result
    }

    
    const editJob = (jobId, data) => request.put(`${jobUrl}/${jobId}`, data);

    const deleteJob = (jobId) => request.delete(`${jobUrl}/${jobId}`);

    const apply = async (jobId) =>{
        const result = await request.post(`${baseUrl}/data/applications`,{
            jobId
        })

        return result
    }

    const getNumberOfApplications = async(jobId) =>{
        const result = await request.get(`${baseUrl}/data/applications?where=jobId%3D%22${jobId}%22&distinct=_ownerId&count`)
        console.log(result)
            return result
        }
    

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
        edit,
        getAllJobs,
        getOneJob,
        createJob,
        editJob,
        deleteJob,
        getNumberOfApplications,
        apply,

    }

}