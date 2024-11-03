import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from './Card.module.css';

const Card = ({ imgPath, name, role, phone, onDelete }) => {
    return (
        <div className={styles.card}>
            {imageSrc && <img src={imgPath} alt={`Image of ${name}`} height="200" width="200" />}
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

Card.propTypes = {
    imgPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Card;
