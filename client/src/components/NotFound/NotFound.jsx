import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1>Something is wrong!</h1>
                    <p>Go the home page or login to your account</p>
                </div>
            </div>
        </>
    );
};
export default NotFound;
