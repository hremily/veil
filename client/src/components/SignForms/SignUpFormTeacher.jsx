import React, { useState } from 'react';
import styles from './SignUpForm.module.css';

function SignUpTeacherForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signupteacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Failed to sign up');
            window.location.href = '/signin';
        } catch (err) {
            setError('Failed to create an account');
        }
    };

    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>Create an Account</h1>
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
                        <button type="submit">Sign up</button>
                        {error && <p className={styles.error}>{error}</p>}
                    </form>
                    <p>
                        Sign up like
                        <span className={styles.teacherLink}>
                            <a href="/signupuser"> student!</a>
                        </span>
                    </p>
                    <p>
                        Have an account?{' '}
                        <span className={styles.signinLink}>
                            <a href="/signin">Sign in</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpTeacherForm;
