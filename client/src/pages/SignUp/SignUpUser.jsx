import React from 'react';
import SignUpFormUser from '../../components/User/SignUpUser/SignUpFormUser'
import styles from './SignUp.css';

const SignUpUser = () => {
    return (
        <div className={styles.signupPage}>
            <div className={styles.containerPage}>
                <div className={styles.signupLeft}>
                    <div className={styles.signupContainer}>
                        <div className={styles.illustrationSection}>
                            <h1>
                                <img
                                    src="../images/VEIL_logo.png"
                                    alt="Illustration"
                                    id="logo"
                                    className={styles.logo}
                                />
                                eil
                            </h1>
                        </div>
                        <SignUpFormUser />
                    </div>
                </div>
                <div className={styles.signupRight}>
                    <img src="../images/sign_picture.png" alt="Illustration" className={styles.signupImage} />
                </div>
            </div>
        </div>
    );
};

export default SignUpUser;
