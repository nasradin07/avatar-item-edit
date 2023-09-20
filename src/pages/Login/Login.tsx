import { useContext, ChangeEvent, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { LoginForm } from '../../types/LoginForm';
import './login.css';

export const Login = () => {
    const { handleLogin, requestInProgress, error } = useContext(UserContext);
    const [form, setForm] = useState<LoginForm>({ password: '', username: '' });

    const handleChange =
        (key: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
            setForm((pre) => ({ ...pre, [key]: e.target.value }));
        };

    const handleSubmit = () => {
        if (requestInProgress) return;
        handleLogin(form);
    };

    return (
        <div className="form-wrapper">
            <form className="form">
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        id="name"
                        className="input"
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        onChange={handleChange('username')}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange('password')}
                    />
                </div>
                <div className="tiny-mock">Forgot password? Too bad!</div>
                {error && <div className="error">{error}</div>}
                <button
                    onClick={handleSubmit}
                    disabled={requestInProgress}
                    type="button"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
