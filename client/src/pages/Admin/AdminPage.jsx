import React, { useState, useEffect } from 'react';
import Card from '../../components/UserCard/Card';
import { useUser } from '../../context/userContext';
import styles from './AdminPage.css';

const AdminPage = () => {
    const { users, fetchAllUsers, deleteUser, error } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        fetchAllUsers(currentPage, usersPerPage);
    }, [currentPage]);

    const handleDelete = async (userId) => {
        await deleteUser(userId);
    };

    const totalPages = Math.ceil(users.length / usersPerPage);

    const renderPagination = () => (
        <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? styles.active : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.adminPage}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.container}>
                {users.map((user) => (
                    <Card
                        key={user._id}
                        imgSrc={user.image || './images/edit-image.png'}
                        name={user.fullname}
                        role={user.role}
                        phone={user.phone_number || 'N/A'}
                        onDelete={() => handleDelete(user._id)}
                    />
                ))}
            </div>
            {renderPagination()}
        </div>
    );
};

export default AdminPage;
