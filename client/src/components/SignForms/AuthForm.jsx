import React from 'react';
import styles from './SignUpForm.module.css';

const AuthForm = ({ title, buttonText, linkText, linkUrl, linkText2, linkUrl2, linkText3, linkUrl3 }) => {
    return (
        <div className={styles.signupWrap}>
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>{title}</h1>
                    <form>
                        <input type="email" placeholder="Enter email" required />
                        <input type="password" placeholder="Password" required />
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
