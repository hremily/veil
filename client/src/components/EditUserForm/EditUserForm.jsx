import React, { useEffect, useState } from 'react';
import styles from './EditUserForm.module.css';

const EditUserForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        phone_number: '',
        email: '',
        password: '',
        years: '',
        subject: '',
    });
    const [userQuestionnaires, setUserQuestionnaires] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/user');
                const data = await response.json();
                setFormData(data);

                const questionnairesResponse = await fetch(`http://localhost:3000/${data.user._id}`);
                const questionnaires = await questionnairesResponse.json();
                setUserQuestionnaires(questionnaires);
            } catch (error) {
                console.error('Something wrong', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/${data.user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            alert('Success');
        } catch (error) {
            console.error('Something wrong: ', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Fullname"
                        />
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone number"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="*********"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <select name="years" value={formData.years} onChange={handleChange}>
                            <option value="">Age of child</option>
                            {[...Array(14).keys()].map((i) => (
                                <option key={i} value={6 + i}>
                                    {6 + i}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />
                    </div>
                    <div className={styles.userQuestionaries}>
                        <ul className={styles.questList}>
                            {userQuestionnaires.map((quest, index) => (
                                <li key={index} className={styles.quest}>
                                    {quest.name} <button type="button">Delete</button>
                                </li>
                            ))}
                        </ul>
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

export default EditUserForm;
