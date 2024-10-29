import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Categories.module.css';
import { subjects } from '../../../assets/subjects-constants';

const Categories = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCategorySelect = (id) => {
        // Navigate to FindTeacherPage and pass the selected category
        navigate('/find-teacher', { state: { selectedCategory: id } });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContent}>
                <div className={styles.left}>
                    <img className={styles.descriptionImg} src="../images/description.png" alt="description" />
                    <button className={styles.consultationBtn}>Get a consultation</button>
                </div>
                <div className={styles.right}>
                    <div className={styles.subjectContainer}>
                        {subjects.map((subject) => (
                            <div
                                className={styles.subject}
                                key={subject.id}
                                onClick={() => handleCategorySelect(subject.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <span style={{ backgroundColor: subject.color }}>
                                    {subject.id.toString().padStart(2, '0')}
                                </span>
                                <p>{subject.name}</p>
                            </div>
                        ))}
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Categories;
