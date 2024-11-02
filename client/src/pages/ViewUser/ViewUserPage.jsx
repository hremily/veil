import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import styles from './ViewUserPage.css';
import { useParams } from 'react-router-dom';

const ViewUserPage = () => {
    const [error, setError] = useState(null);
    const { fetchUserById, user, setUser } = useUser();
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const fetchedUser = await fetchUserById(userId);
                setUser(fetchedUser);
                if (fetchedUser.image && fetchedUser.image.length > 0) {
                    setImageUrl(`http://localhost:9000/server/assets/userImage/${fetchedUser.image}`);
                } else {
                    setImageUrl('http://localhost:9000/public/images/edit-image.png');
                }
            } catch (err) {
                setError('Could not load user data. Please try again later.');
                console.error('Error fetching user data:', err);
            }
        };

        loadUserData();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.minHScreen}>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <img src={imageUrl} alt="User" height="600" width="400" />
                    </div>
                    <div className={styles.contentSection}>
                        {error ? (
                            <p>{error}</p>
                        ) : user ? (
                            <>
                                {user.image && <img src={user.image} alt={`${user.fullname}'s profile`} />}
                                <h1>{user.fullname}</h1>
                                <h2>{user.description}</h2>
                                <p>{user.experience}</p>
                                <p>{user.price}</p>
                                <p>{user.email}</p>
                                <p>{user.phone_number}</p>
                            </>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserPage;
