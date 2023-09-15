import { makeRequest } from '../client';

export const handleFetch = async <T>(signal: AbortSignal, url: string) => {
    const res = await makeRequest<T>('GET', url, null, {
        signal,
    });
    return res;
};
