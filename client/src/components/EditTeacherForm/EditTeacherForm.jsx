import React, { useEffect, useState } from 'react';
import styles from './EditTeacherForm.module.css';

const EditTeacherForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        subject: '',
        price: '',
        experience: '',
        description: '',
    });

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await fetch('http://localhost:3000/user');
                const data = await response.json();
                setFormData({
                    fullname: data.fullname || '',
                    email: data.email || '',
                    phone_number: data.phone_number || '',
                    password: '',
                    subject: data.subject || '',
                    price: data.price || '',
                    experience: data.experience || '',
                    description: data.description || '',
                });
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/${data.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Profile updated successfully:', result);
            } else {
                console.error('Error updating profile:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit account</h2>
                <form onSubmit={handleSubmit} className={styles.editForm}>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Fullname"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone number"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <select>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject} className={styles.subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Choose price"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="Write about your experience"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a short description about you"
                        />
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
