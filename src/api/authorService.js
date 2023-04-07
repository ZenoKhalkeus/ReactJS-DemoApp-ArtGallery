import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/artwork';
const request = requestFactory();

export const getAuthor = async (id) => {
    const searchQuery = encodeURIComponent(`_id="${id}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    return result[0];
};