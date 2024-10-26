import PropTypes from 'prop-types';
import React from 'react';

import styles from './MainModal.module.css';

const MainModal = ({ toggleModal }) => {
    return (
        <div className={styles.modal} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(error) => error.stopPropagation()}>
                <span className={styles.close} onClick={toggleModal}>
                    &times;
                </span>
                <ul className={styles.modalList}>
                    <li className={styles.modalListItem}>
                        <a href="#logout" className={styles.modalLink}>
                            <div className={styles.imageContainer}>
                                <img src="/images/logout.png" alt="" srcSet="" />
                                <i className="fas fa-sign-out-alt"></i> Log out
                            </div>
                        </a>
                    </li>
                    <li className={styles.modalListItem}>
                        <a href="#change" className={styles.modalLink}>
                            <i className="fas fa-user-edit"></i> Change
                        </a>
                    </li>
                    <li className={styles.modalListItem}>
                        <a href="#darkmode" className={styles.modalLink}>
                            <i className="fas fa-moon"></i> Dark
                        </a>
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
