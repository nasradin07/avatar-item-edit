if (typeof import.meta.env.VITE_API_URL !== 'string') {
    throw new Error('missing api url in env file');
}

export const config = {
    apiUrl: import.meta.env.VITE_API_URL,
};
