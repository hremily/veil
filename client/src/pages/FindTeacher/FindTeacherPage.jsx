import React, { useState } from 'react';

import Questionary from '../../components/Questionary/Questionary';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './FindTeacherPage.css';

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

    const previousTeacher = () => {
        setCurrentIndex((previousIndex) => (previousIndex === 0 ? teachers.length - 1 : previousIndex - 1));
    };

    const nextTeacher = () => {
        setCurrentIndex((previousIndex) => (previousIndex === teachers.length - 1 ? 0 : previousIndex + 1));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.teachersSection}>
                <div className={styles.teachersHeader}>
                    <h1>Our Teachers</h1>
                    <div className={styles.buttons}>
                        <button className={styles.prevButton} onClick={previousTeacher}>
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
        </div>
    );
};

export default FindTeacherPage;
