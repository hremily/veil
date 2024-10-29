import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainModal from '../MainModal/MainModal';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { userRole, loading } = useAuth();

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    useEffect(() => {
        setIsModalOpen(false);
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const getProfileLink = () => {
        switch (userRole) {
            case 'TEACHER':
                return '/teacher-profile';
            case 'USER':
                return '/user-profile';
            case 'ADMIN':
                return '/admin';
            default:
                return '/';
        }
    };

    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.illustrationSection}>
                    <div className={styles.logoWrapper}>
                        <img src={`../images/VEIL_logo.png`} alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>eil {'|'} </span>
                        <Link to="/" className={styles.homeLink} style={{ color: 'var(--primary-color)' }}>
                            HOME
                        </Link>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <Link to="/categories">Categories</Link>
                    {userRole && <Link to={getProfileLink()}>Profile</Link>}
                    <button className={styles.settings} onClick={toggleModal}>
                        <img src={`../images/settings.png`} alt="settings" />
                    </button>
                </nav>
                {isModalOpen && <MainModal toggleModal={toggleModal} />}
            </div>
        </header>
    );
}

export default Header;
