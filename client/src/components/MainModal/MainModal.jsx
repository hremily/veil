import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainModal.module.css';

const MainModal = ({ toggleModal }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toggleModal();
        navigate('/signout');
    };

    const handleProfileChange = () => {
        toggleModal();
        navigate('/user-profile');
    };

    return (
        <div className={styles.modal} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
                <span className={styles.close} onClick={toggleModal}>
                    &times;
                </span>
                <ul className={styles.modalList}>
                    <li className={styles.modalListItem}>
                        <button onClick={handleLogout} className={styles.modalLink}>
                            <div className={styles.imageContainer}>
                                <img src="../images/logout.png" alt="signout" /> Log out
                            </div>
                        </button>
                    </li>
                    <li className={styles.modalListItem}>
                        <button onClick={handleProfileChange} className={styles.modalLink}>
                            <img src="../images/change.png" alt="change-profile" /> Change
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

MainModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};

export default MainModal;
