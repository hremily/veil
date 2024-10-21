import React from 'react';
import styles from './EditUserProfile.css';
import Header from '../../components/Header/Header';
import EditUserForm from '../../components/EditUserForm/EditUserForm';
import Footer from '../../components/Footer/Footer';

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
