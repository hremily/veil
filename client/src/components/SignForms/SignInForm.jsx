import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';
import useAuth from '../../hooks/useAuth.js';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to sign in');
            const userData = await response.json();
            sessionStorage.setItem(
                'user',
                JSON.stringify({
                    email: userData.email,
                    id: userData.id,
                    role: userData.role,
                }),
            );
            login(userData);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>Enter to the Account</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign in</button>
                        {error && <p className={styles.error}>{error}</p>}
                    </form>
                    <p>
                        Don’t have an account?{' '}
                        <span className={styles.signinLink}>
                            <a href="/signup-user">Sign up</a>
                        </span>
                    </p>
                    <p>
                        <span className={styles.signinLink}>
                            <a href="/reset">Reset password</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
