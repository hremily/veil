import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainModal from '../MainModal/MainModal';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import { ROUTES } from '../../../assets/pages-routes';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated, signout } = useAuth();
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.style.setProperty('--secondary-color', '#ffffff');
            document.documentElement.style.setProperty('--background-color', '#eaeaea');
        } else {
            document.documentElement.style.setProperty('--secondary-color', '#eaeaea');
            document.documentElement.style.setProperty('--background-color', '#553A59');
        }
    }, [isDarkTheme]);

    useEffect(() => {
        setIsModalOpen(false);
    }, [location]);

    const handleThemeChange = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
        toggleModal();
    };

    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.illustrationSection}>
                    <div className={styles.logoWrapper}>
                        <img src={`../images/VEIL_logo.png`} alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>eil {'|'} </span>
                        <Link to={ROUTES.HOME} className={styles.homeLink} style={{ color: 'var(--primary-color)' }}>
                            HOME
                        </Link>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <Link to={ROUTES.CATEGORIES}>Categories</Link>
                    {user ? (
                        <>
                            <Link to={`/profile/${user._id}`}>Profile</Link>
                        </>
                    ) : (
                        <Link to={ROUTES.SIGNIN}>Login</Link>
                    )}
                    <button className={styles.settings} onClick={toggleModal}>
                        <img src={`../images/settings.png`} alt="settings" />
                    </button>
                </nav>
                {isModalOpen && (
                    <MainModal
                        toggleModal={toggleModal}
                        handleThemeChange={handleThemeChange}
                        isDarkTheme={isDarkTheme}
                    />
                )}
            </div>
        </header>
    );
}

export default Header;
