import React from 'react';
import styles from './Questionary.module.css';

const Questionary = () => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}></div>
            <form className={styles.formGroup}>
                <div className={styles.container}>
                    <div className={styles.topElements}>
                        <div className={styles.element}>6-18 years</div>
                        <div className={styles.element}>online lessons</div>
                        <div className={styles.element}>a special approach</div>
                    </div>
                    <div className={styles.logo}>Veil School</div>
                </div>
                <div className={styles.flexContainer}>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter your fullname"
                        className={styles.fullname}
                        required
                    />
                    <input type="email" name="email" placeholder="Enter your email" className={styles.email} required />
                    <input type="number" name="age" placeholder="Years" className={styles.years} required />
                </div>
                <div className={styles.flexContainer}>
                    <select name="teacher" className={styles.select}>
                        <option value="">Choose teacher</option>
                        <option value="Grab Emilia">Grab Emilia</option>
                        <option value="John Smith">John Smith</option>
                    </select>
                    <select name="subject" className={styles.select}>
                        <option value="">Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Questionary;
