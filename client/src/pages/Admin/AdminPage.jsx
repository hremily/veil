import React, { useState } from 'react';
import styles from './AdminPage.css';
import Header from '../../components/Header/Header';
import Card from '../../components/UserCard/Card';
import Footer from '../../components/Footer/Footer';

const AdminPage = () => {
    const [users, setUsers] = useState([
        {
            imgSrc: './images/edit-image.png',
            name: 'User`s fullname',
            role: 'User`s role',
            phone: 'User`s phone',
        },
        {
            imgSrc: './images/edit-image.png',
            name: 'User`s fullname',
            role: 'User`s role',
            phone: 'User`s phone',
        },
        {
            imgSrc: './images/edit-image.png',
            name: 'User`s fullname',
            role: 'User`s role',
            phone: 'User`s phone',
        },
        {
            imgSrc: './images/edit-image.png',
            name: 'User`s fullname',
            role: 'User`s role',
            phone: 'User`s phone',
        },
    ]);

    const handleDelete = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };

    return (
        <div className={styles.adminPage}>
            <Header />
            <div className={styles.container}>
                {users.map((user, index) => (
                    <Card
                        key={index}
                        imgSrc={user.imgSrc}
                        name={user.name}
                        role={user.role}
                        phone={user.phone}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};
export default AdminPage;
