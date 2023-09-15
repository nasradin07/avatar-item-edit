import { ReactNode, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Login } from '../pages/Login/Login';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { loggedIn } = useContext(UserContext);

    return loggedIn ? children : <Login />;
};
