import React from 'react';
import styles from './SignUp.css';
import SignUpTeacherForm from '../../components/SignForms/SignUpFormTeacher';
import Logo from '../../components/Logo/Logo';
import SignPicture from '../../components/SignPicture/Pic';

const SignUpTeacher = () => {
    return (
        <div className={styles.signupPage}>
            <div className={styles.containerPage}>
                <div className={styles.signupLeft}>
                    <div className={styles.signupContainer}>
                        <Logo />
                        <SignUpTeacherForm />
                    </div>
                </div>
                <SignPicture />
            </div>
        </div>
    );
};

export default SignUpTeacher;
