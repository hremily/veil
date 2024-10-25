import React from 'react';
import styles from './EditTeacherForm.module.css';

const EditTeacherForm = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit account</h2>
                <form action="" method="POST" className={styles.editForm}>
                    <div className={styles.divideGroup}>
                        <input type="text" name="fullname" placeholder="Fullname" />
                        <input type="email" name="email" placeholder="E-mail" />
                    </div>
                    <div className={styles.divideGroup}>
                        <input type="text" name="phone_number" placeholder="Phone number" />
                        <input type="password" name="password" placeholder="********" />
                    </div>
                    <div className={styles.divideGroup}>
                        <input type="text" name="subject" placeholder="Choose subject" />
                        <input type="number" name="price" placeholder="Choose price" />
                    </div>
                    <div className={styles.divideGroup}>
                        <textarea name="experience" placeholder="Write about your experience" />
                        <textarea name="description" placeholder="Write the short description about you" />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>

            <div className={styles.imgContainer}>
                <input type="file" name="image" />
                <img src="../images/edit-image.png" alt="Profile" />
            </div>
        </div>
    );
};

export default EditTeacherForm;
