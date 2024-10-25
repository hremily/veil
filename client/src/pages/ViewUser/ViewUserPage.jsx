import React from 'react';
import styles from './ViewUserPage.css';

const ViewUserPage = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.minHScreen}>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <img alt="User Image" height="600" src="../images/edit-image.png" width="400" />
                    </div>
                    <div className={styles.contentSection}>
                        <h2>User`s short description</h2>
                        <h1>User`s fullname</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserPage;
