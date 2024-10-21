import React from 'react';
import styles from './EditUserForm.module.css';

const EditUserForm = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit Account</h2>
                <form action="" method="post">
                    <div className={styles.divideGroup}>
                        <input type="text" name="fullname" placeholder="Fullname" />
                        <input type="text" name="phone_number" placeholder="Phone number" />
                    </div>
                    <div className={styles.divideGroup}>
                        <input type="email" name="email" placeholder="E-mail" />
                        <input type="password" name="password" placeholder="*********" />
                    </div>
                    <div className={styles.divideGroup}>
                        <select type="text" name="years">
                            <option value="age">Age of child</option>
                            <option value="age">6</option>
                            <option value="age">7</option>
                            <option value="age">8</option>
                            <option value="age">9</option>
                            <option value="age">10</option>
                            <option value="age">11</option>
                            <option value="age">12</option>
                            <option value="age">13</option>
                            <option value="age">14</option>
                            <option value="age">15</option>
                            <option value="age">16</option>
                            <option value="age">17</option>
                            <option value="age">18</option>
                            <option value="age">19</option>
                        </select>
                        <input type="text" name="subject" placeholder="Subject" />
                    </div>
                    <div className={styles.userQuestionaries}>
                        <ul className={styles.questList}>
                            <li className={styles.quest}>First Quest</li>
                            <button type="button">Delete</button>
                        </ul>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
            <div className={styles.imgContainer}>
                <input type="file" name="image" />
                <br />
                <img src="../images/edit-image.png" alt="Profile" />
            </div>
        </div>
    );
};

export default EditUserForm;
