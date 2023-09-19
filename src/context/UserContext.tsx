import { createContext, useEffect, useState, ReactNode } from 'react';
import { LoginForm } from '../types/LoginForm';
import { removeToken, setToken } from '../utils/localStorage-utils';
import { makeRequest } from '../client';
import { LoginResponse } from '../types/LoginResponse';
import { useRequestTrack } from '../hooks/useRequestTrack';
import { handleFetch } from '../utils/handleFetch';

type LoginHandler = (form: LoginForm) => void;

type UserContext = {
    loggedIn: boolean;
    handleLogin: LoginHandler;
    requestInProgress: boolean;
    error: false | string;
    logout: () => void;
};

export const UserContext = createContext<UserContext>({
    loggedIn: false,
    handleLogin: () => {},
    error: false,
    requestInProgress: false,
    logout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { requestInProgress, setError, setRequestInProgress, error } =
        useRequestTrack();

    const handleLogin: LoginHandler = async (body) => {
        if (requestInProgress) return;
        setRequestInProgress(true);
        setError(false);
        const res = await makeRequest<LoginResponse>(
            'POST',
            '/auth/admin/login',
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        setRequestInProgress(false);
        if (res === 'Error') {
            setError('Failed to login, incorect username or password.');
        } else {
            setLoggedIn(true);
            setToken(res.access_token);
        }
    };

    const logout = () => {
        removeToken();
        setLoggedIn(false);
    };

    useEffect(() => {
        const controller = new AbortController();
        handleFetch<Record<string, unknown>>(controller.signal, '/me')
            .then((res) => setLoggedIn(res !== 'Error'))
            .catch(() => console.log('failed to login'));
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{ loggedIn, handleLogin, error, requestInProgress, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};
