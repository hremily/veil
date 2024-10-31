import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './MainModal.module.css';
import { roleConstans } from '../../../assets/role-constants';
const MainModal = ({ toggleModal }) => {
    const navigate = useNavigate();
    const { signout } = useAuth();
    const { user } = useAuth();
    const userRole = user?.role;

    const handleLogout = () => {
        toggleModal();
        signout();
    };

    const handleProfileChange = () => {
        toggleModal();
        if (userRole == roleConstans.USER) {
            navigate('/teacher-profile');
        } else if (userRole == roleConstans.USER) {
            navigate('/user-profile');
        } else if (userRole == roleConstans.ADMIN) {
            navigate('/admin');
        }
    };

    const handleThemeChange = () => {
        toggleModal();
        document.documentElement.style.setProperty('--primary-color', '#333');
        document.documentElement.style.setProperty('--secondary-color', '#eaeaea');
        document.documentElement.style.setProperty('--background-color', '#553A59');
        document.documentElement.style.setProperty('--text-color', '#ba68c8');
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

                    <li className={styles.modalListItem}>
                        <button onClick={handleThemeChange} className={styles.modalLink}>
                            <img src="../images/dark.png" alt="dark-theme" /> Dark
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
