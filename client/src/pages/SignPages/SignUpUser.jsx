import React from 'react';
import styles from './SignUp.css';
import SignUpFormUser from '../../components/SignForms/SignUpFormUser';
import SignPicture from '../../components/SignPicture/Pic';
import Logo from '../../components/Logo/Logo';

const SignUpUser = () => {
    return (
        <div className={styles.signupPage}>
            <div className={styles.containerPage}>
                <div className={styles.signupLeft}>
                    <div className={styles.signupContainer}>
                        <Logo />
                        <SignUpFormUser />
                    </div>
                </div>
                <SignPicture />
            </div>
        </div>
    );
};

export default SignUpUser;
