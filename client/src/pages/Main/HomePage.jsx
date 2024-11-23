import React from 'react';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Questionary from '../../components/Questionary/Questionary';
import TextMain from '../../components/TextMain/TextMain';
import styles from './HomePage.css';

const HomePage = () => {
    return (
        <div className={styles.homeSection}>
            <Header />
            <section className={styles.main}>
                <div className={styles.imageContainer}>
                    <img src="../images/boys-main.png" alt="Illustration" className={styles.image} />
                    <div className={styles.textOverlay}>
                        <h1>
                            Grow your 196+ <span>communication</span> skills with us
                        </h1>
                        <br />
                        <p>
                            Providing the best material with passion, we create the core essence of brands though
                            stories & sings
                        </p>
                        <br />
                        <br />
                        <button className={styles.findTeacherBtn}>Find Teacher</button>
                    </div>
                </div>
            </section>
            <TextMain />
            <div className={styles.flexContainer}>
                <Questionary />
                <img src="../images/children-main.png" alt="children" className={styles.imageForm} />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
