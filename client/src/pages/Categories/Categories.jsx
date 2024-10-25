import React from 'react';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './Categories.css';

const Categories = () => {
    const subjects = [
        { id: 1, color: '#ffeb3b' },
        { id: 2, color: '#ff9800' },
        { id: 3, color: '#8bc34a' },
        { id: 4, color: '#00bcd4' },
        { id: 5, color: '#3f51b5' },
        { id: 6, color: '#9c27b0' },
        { id: 7, color: '#e91e63' },
        { id: 8, color: '#673ab7' },
        { id: 9, color: '#009688' },
        { id: 10, color: '#795548' },
    ];

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.mainContent}>
                <div className={styles.left}>
                    <img className={styles.descriptionImg} src="../images/description.png" alt="description" />
                    <button className={styles.consultationBtn}>Get a consultation</button>
                </div>
                <div className={styles.right}>
                    <div className={styles.subjectContainer}>
                        {subjects.map((subject) => (
                            <div className={styles.subject} key={subject.id}>
                                <span style={{ backgroundColor: subject.color }}>
                                    {subject.id.toString().padStart(2, '0')}
                                </span>
                                <p>Subject name</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Categories;
