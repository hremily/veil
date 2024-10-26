import React, { useState } from 'react';

import EditTeacherForm from '../../components/EditTeacherForm/EditTeacherForm';
import styles from './EditTeacherProfile.css';

const EditTeacherProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        document.querySelector('#image').click();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.editTeacherProfile}>
            <div className={styles.editTeacherProfile__content}>
                <div className={styles.formContainer}>
                    <EditTeacherForm />
                </div>
            </div>
        </div>
    );
};

export default EditTeacherProfile;
