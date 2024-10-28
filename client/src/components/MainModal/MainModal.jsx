import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './MainModal.module.css';

const MainModal = ({ toggleModal }) => {
    return (
        <div className={styles.modal} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
                {' '}
                <span className={styles.close} onClick={toggleModal}>
                    &times;
                </span>
                <ul className={styles.modalList}>
                    <li className={styles.modalListItem}>
                        <Link to="/logout" className={styles.modalLink}>
                            <div className={styles.imageContainer}>
                                <i className="fas fa-sign-out-alt"></i> Log out
                            </div>
                        </Link>
                    </li>
                    <li className={styles.modalListItem}>
                        <Link to="/user-profile" className={styles.modalLink} onClick={toggleModal}>
                            <i className="fas fa-user-edit"></i> Change
                        </Link>
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
