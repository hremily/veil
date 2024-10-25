import React from 'react';

import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignForms/SignInForm';
import SignPicture from '../../components/SignPicture/Pic';
import styles from './SignUp.css';

const SignIn = () => {
    return (
        <div className={styles.signupPage}>
            <div className={styles.containerPage}>
                <div className={styles.signupLeft}>
                    <div className={styles.signupContainer}>
                        <Logo />
                        <SignInForm />
                    </div>
                </div>
                <SignPicture />
            </div>
        </div>
    );
};

export default SignIn;
