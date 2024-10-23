import PropTypes from 'prop-types';
import React from 'react';

import styles from './MainModal.module.css';

const Modal = ({ toggleModal }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={toggleModal}>
                    &times;
                </span>
                <ul className={styles.modalList}>
                    <li className={styles.modalListItem}>
                        <a href="#logout" className={styles.modalLink}>
                            <i className="fas fa-sign-out-alt"></i> Log out
                        </a>
                    </li>
                    <li className={styles.modalListItem}>
                        <a href="#change" className={styles.modalLink}>
                            <i className="fas fa-user-edit"></i> Change
                        </a>
                    </li>
                    <li className={styles.modalListItem}>
                        <a href="#darkmode" className={styles.modalLink}>
                            <i className="fas fa-moon"></i> Dark mode
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};

export default Modal;
