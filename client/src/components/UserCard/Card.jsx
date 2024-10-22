import React from 'react';
import styles from './Card.module.css';

const Card = ({ imgSrc, name, role, phone, onDelete }) => {
    return (
        <div className={styles.card}>
            <img src={imgSrc} alt={`Image of ${name}`} height="200" width="200" />
            <div className={styles.userData}>
                <div className={styles.name}>{name}</div>
                <div className={styles.role}>{role}</div>
                <div className={styles.phone}>{phone}</div>
            </div>
            <button onClick={onDelete} className={styles.deleteButton}>
                <img src="../images/delete.png" alt="delete" />
            </button>
        </div>
    );
};

export default Card;
