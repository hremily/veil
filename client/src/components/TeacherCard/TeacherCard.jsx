import React from 'react';
import styles from './TeacherCard.module.css';
import { useNavigate } from 'react-router-dom';

const TeacherCard = ({ id, name, description, lessons, image }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className={styles.teacherCard} onClick={handleCardClick}>
            <div className={styles.teacherImage}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.teacherInfo}>
                <div className={styles.teacherHeader}>
                    <img src="../images/circle.png" alt="circle" className={styles.circle} />
                    <h2>{name}</h2>
                </div>
                <p>{description}</p>
                <p>{lessons}</p>
            </div>
        </div>
    );
};

export default TeacherCard;
