import React from 'react';

import styles from './Pic.module.css';

function SignPicture() {
    return (
        <div className={styles.signupRight}>
            <img src="../images/sign_picture.png" alt="Illustration" className={styles.signupImage} />
        </div>
    );
}

export default SignPicture;
