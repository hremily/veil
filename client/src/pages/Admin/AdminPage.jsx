import React, { useState, useEffect } from 'react';
import Card from '../../components/UserCard/Card';
import styles from './AdminPage.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users?page=${currentPage}&limit=${usersPerPage}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data.users);
                setTotalUsers(data.total);
            } catch (err) {
                setError('Failed to load users');
            }
        };

        fetchUsers();
    }, [currentPage, usersPerPage]);

    const handleDelete = async (userId) => {
        try {
            await fetch(`http://localhost:3000/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    const totalPages = Math.ceil(totalUsers / usersPerPage);

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
