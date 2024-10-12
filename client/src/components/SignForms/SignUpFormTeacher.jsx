import React from 'react';
import styles from './SignUpForm.module.css';

function SignUpTeacherForm() {
    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>Create an Account</h1>
                    <form>
                        <input type="email" placeholder="Enter email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Sign up</button>
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
