import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainModal from '../MainModal/MainModal';
import styles from './Header.module.css';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.illustrationSection}>
                    <div className={styles.logoWrapper}>
                        <img src="../images/VEIL_logo.png" alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>eil {'|'} </span>
                        <Link to="/" className={styles.homeLink} style={{ color: 'var(--primary-color)' }}>
                            HOME
                        </Link>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <Link to="/categories">Categories</Link>
                    <Link to="/profile">Profile</Link>
                    <a href="#signout" onClick={toggleModal}>
                        <img src="/images/settings.png" alt="signout" />
                    </a>
                </nav>
                {isModalOpen && <MainModal toggleModal={toggleModal} />}
            </div>
        </header>
    );
}

export default Header;
