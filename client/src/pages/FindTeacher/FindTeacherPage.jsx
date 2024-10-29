import React, { useState, useEffect } from 'react';
import Questionary from '../../components/Questionary/Questionary';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './FindTeacherPage.css';

const FindTeacherPage = ({ location }) => {
    const { selectedCategory } = location.state;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/teachers?subjectId=${selectedCategory}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('Failed to fetch teachers');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedCategory) {
            fetchTeachers();
        }
    }, [selectedCategory]);

    const previousTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? teachers.length - 1 : prevIndex - 1));
    };

    const nextTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === teachers.length - 1 ? 0 : prevIndex + 1));
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
                    {teachers.length > 0 ? (
                        <TeacherCard
                            name={teachers[currentIndex].fullname}
                            description={teachers[currentIndex].description}
                            skills={teachers[currentIndex].skills}
                            imgSrc={teachers[currentIndex].image}
                        />
                    ) : (
                        <p>No teachers available for this category.</p>
                    )}
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
