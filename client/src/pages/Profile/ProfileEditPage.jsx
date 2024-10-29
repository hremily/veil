import React from 'react';
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import EditTeacherProfile from '../EditTeacherProfile/EditTeacherProfile';
import AdminProfile from '../Admin/AdminPage';

import { roleConstans } from '../../../assets/role-constants';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
    const { userRole } = useAuth();

    if (userRole === roleConstans.ADMIN) {
        return <AdminProfile />;
    }

    return <div>{userRole === roleConstans.TEACHER ? <EditTeacherProfile /> : <EditUserProfile />}</div>;
};

export default ProfilePage;
