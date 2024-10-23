import React, { useState } from 'react';
import styles from './FindTeacherPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Questionary from '../../components/Questionary/Questionary';
import TeacherCard from '../../components/TeacherCard/TeacherCard';

const FindTeacherPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teachers = [
        {
            name: 'Grab Emilia',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            skills: ['Backend Development', 'Database Development', 'API/REST/CRUD Development'],
            image: '../images/edit-image.png',
        },
    ];

    const prevTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? teachers.length - 1 : prevIndex - 1));
    };

    const nextTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === teachers.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.teachersSection}>
                <div className={styles.teachersHeader}>
                    <h1>Our Teachers</h1>
                    <div className={styles.buttons}>
                        <button className={styles.prevButton} onClick={prevTeacher}>
                            &lt;
                        </button>
                        <button className={styles.nextButton} onClick={nextTeacher}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className={styles.carouselContent}>
                    <TeacherCard
                        name={teachers[currentIndex].name}
                        description={teachers[currentIndex].description}
                        skills={teachers[currentIndex].skills}
                        image={teachers[currentIndex].image}
                    />
                </div>
            </div>
            <div className={styles.flexContainer}>
                <Questionary />
                <img src="../images/children-main.png" alt="children" className={styles.imageForm} />
            </div>
            <Footer />
        </div>
    );
};

export default FindTeacherPage;
