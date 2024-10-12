import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.illustrationSection}>
                    <div className={styles.logoWrapper}>
                        <img src="../images/VEIL_logo.png" alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>eil {'|'} </span>
                        <a href="home" className={styles.homeLink}>
                            HOME
                        </a>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <a href="#categories">Categories</a>

                    <a href="#profile">Profile</a>
                    <a href="signout">
                        <img src="../../images/logout.png" alt="signout" />
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
