import React from 'react';

import styles from './SignUpForm.module.css';

function SignIn() {
    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>Enter to the Account</h1>
                    <form>
                        <input type="email" placeholder="Enter email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Sign in</button>
                    </form>
                    <p>
                        Don`t have an account?{' '}
                        <span className={styles.signinLink}>
                            <a href="/signupuser">Sign up</a>
                        </span>
                    </p>
                    <p>
                        <span className={styles.signinLink}>
                            <a href="/signupuser">Reset password</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
