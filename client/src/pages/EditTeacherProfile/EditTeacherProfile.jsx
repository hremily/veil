import React, { useState } from 'react';
import styles from './EditTeacherProfile.css';
import Header from '../../components/Header/Header';
import EditTeacherForm from '../../components/EditTeacherForm/EditTeacherForm';
import Footer from '../../components/Footer/Footer';

const EditTeacherProfile = () => {
    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageClick = () => {
    //     document.getElementById('image').click();
    // };

    // const handleImageChange = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         setSelectedImage(URL.createObjectURL(file));
    //     }
    // };

    return (
        <div className={styles.editTeacherProfile}>
            <Header />
            <div className={styles.editTeacherProfile__content}>
                <div className={styles.formContainer}>
                    <EditTeacherForm />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditTeacherProfile;
