import { useState } from 'react';

export const useRequestTrack = () => {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [error, setError] = useState<string | false>(false);

    return {
        error,
        setError,
        requestInProgress,
        setRequestInProgress,
    };
};
