import React, { useState, useEffect } from 'react';
import styles from './Questionary.module.css';

const Questionary = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        age: '',
        teacher: '',
        subject: '',
    });
    const [error, setError] = useState('');
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/teachers');
                if (!response.ok) throw new Error('Failed to fetch teachers');
                const data = await response.json();
                setTeachers(data);
            } catch (err) {
                setError('Could not load data');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to submit form');
            setFormData({ fullname: '', email: '', age: '', teacher: '', subject: '' });
            alert('Form submitted successfully!');
        } catch (err) {
            setError('Failed to submit the form');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                {error && <p className={styles.error}>{error}</p>}
                <form className={styles.formGroup} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div className={styles.topElements}>
                            <div className={styles.element}>6-18 years</div>
                            <div className={styles.element}>online lessons</div>
                            <div className={styles.element}>a special approach</div>
                        </div>
                        <div className={styles.logo}>Veil School</div>
                    </div>
                    <div className={styles.flexContainer}>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your fullname"
                            className={styles.fullname}
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={styles.email}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Years"
                            className={styles.years}
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.flexContainer}>
                        <select name="teacher" onChange={handleChange} required>
                            <option value="" disabled selected>
                                Choose teacher
                            </option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.name}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className={styles.subject}
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Questionary;
