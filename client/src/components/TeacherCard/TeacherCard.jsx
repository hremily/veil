import React from 'react';
import styles from './TeacherCard.module.css';

const TeacherCard = ({ name, description, skills, image }) => {
    return (
        <div className={styles.teacherCard}>
            <div className={styles.teacherImage}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.teacherInfo}>
                <div className={styles.teacherHeader}>
                    <img src="../images/circle.png" alt="circle" className={styles.circle} />
                    <h2>{name}</h2>
                </div>
                <p>{description}</p>
                <ul>
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherCard;
