import React, { useEffect, useState } from 'react';
import styles from './ViewUserPage.css';

const ViewUserPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const userId = JSON.parse(sessionStorage.getItem('user'))?.id;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.minHScreen}>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <img alt="User Image" height="600" src="../images/edit-image.png" width="400" />
                    </div>
                    <div className={styles.contentSection}>
                        {error ? (
                            <p>{error}</p>
                        ) : user ? (
                            <>
                                {user.image && <img src={user.image} alt={`${user.fullname}'s profile`} />}
                                {user.fullname && <h1>{user.fullname}</h1>}
                                {user.description && <h2>{user.description}</h2>}
                                {user.experience && <p>{user.experience}</p>}
                                {user.price !== undefined && <p>{user.price}</p>}
                                {user.email && <p>{user.email}</p>}
                                {user.phone_number && <p>{user.phone_number}</p>}
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
