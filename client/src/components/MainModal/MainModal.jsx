import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './MainModal.module.css';
import { roleConstans } from '../../../assets/role-constants';
import { ROUTES } from '../../../assets/pages-routes';

const MainModal = ({ toggleModal, handleThemeChange, isDarkTheme }) => {
    const navigate = useNavigate();
    const { signout, user } = useAuth();
    const userRole = user?.role.toUpperCase();

    const handleLogout = () => {
        toggleModal();
        signout();
    };

    const handleProfileChange = () => {
        toggleModal();
        console.log('User Role:', userRole);

        const roleRoute = {
            [roleConstans.TEACHER]: ROUTES.TEACHER_PROFILE,
            [roleConstans.USER]: ROUTES.USER_PROFILE,
            [roleConstans.ADMIN]: ROUTES.ADMIN,
        };
        const route = roleRoute[userRole];
        console.log(route);
        navigate(route);
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
                            <div className={styles.imageContainer}>
                                <img
                                    src={isDarkTheme ? '../images/dark.png' : '../images/light.png'}
                                    alt="theme-toggle"
                                />
                                {isDarkTheme ? 'Dark' : 'Light'}
                            </div>
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
