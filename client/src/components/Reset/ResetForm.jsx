import React from 'react';
import styles from './Reset.module.css';

const Reset = () => {
    return (
        <div className={styles.reset}>
            <form>
                <p>Enter your email for reseting password: </p>
                <input type="email" name="email" placeholder="email" />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
};

export default Reset;
