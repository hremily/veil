import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import styles from './SignUpForm.module.css';

const AuthForm = ({ title, buttonText, linkText, linkUrl, linkText2, linkUrl2 }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (buttonText === 'Sign in') {
            await auth.signin(email, password);
        } else {
            await auth.signup(email, password, 'user');
        }
    };

    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>{title}</h1>
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
                        <button type="submit">{buttonText}</button>
                    </form>
                    {linkText && (
                        <p>
                            {linkText}{' '}
                            <span className={styles.signinLink}>
                                <a href={linkUrl}>Sign up</a>
                            </span>
                        </p>
                    )}
                    {linkText2 && (
                        <p>
                            <span className={styles.signinLink}>
                                <a href={linkUrl2}>{linkText2}</a>
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
