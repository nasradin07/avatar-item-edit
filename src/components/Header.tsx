import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Header = () => {
    const { logout, loggedIn } = useContext(UserContext);
    return (
        <div className="header">
            <div>Yuno editor</div>
            {loggedIn && (
                <div onClick={logout} className="logout">
                    Logout
                </div>
            )}
        </div>
    );
};
