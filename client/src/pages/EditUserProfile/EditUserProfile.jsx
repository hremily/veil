import React from 'react';

import EditUserForm from '../../components/EditUserForm/EditUserForm';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './EditUserProfile.css';

const EditUserProfile = () => {
    return (
        <div className={styles.editPage}>
            <Header />
            <div className={styles.editContainer}>
                <EditUserForm />
            </div>
            <Footer />
        </div>
    );
};

export default EditUserProfile;
