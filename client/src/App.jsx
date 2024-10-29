import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Admin from './pages/Admin/AdminPage';
import Categories from './pages/Categories/Categories';
import EditTeacherProfile from './pages/EditTeacherProfile/EditTeacherProfile';
import EditUserProfile from './pages/EditUserProfile/EditUserProfile';
import FindTeacher from './pages/FindTeacher/FindTeacherPage';
import HomePage from './pages/Main/HomePage';
import SignIn from './pages/SignPages/SignIn';
import SignUpTeacher from './pages/SignPages/SignUpTeacher';
import SignUpUser from './pages/SignPages/SignUpUser';
import ViewUserPage from './pages/ViewUser/ViewUserPage';
import MainModal from './components/MainModal/MainModal';

import { roleConstans } from '../assets/role-constants';
import { AuthProvider } from './routes/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (isModalOpen) {
            setIsModalOpen(false);
        }
    }, [location.pathname]);

    const hideHeaderPaths = ['/signin', '/signup-teacher', '/signup-user'];
    const hideFooterPaths = ['/signin', '/signup-teacher', '/signup-user'];

    const showHeader = !hideHeaderPaths.includes(location.pathname);
    const showFooter = !hideFooterPaths.includes(location.pathname);

    return (
        <AuthProvider>
            {showHeader && <Header />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup-user" element={<SignUpUser />} />
                <Route path="/signup-teacher" element={<SignUpTeacher />} />

                <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<ViewUserPage />} />} />
                <Route
                    path="/admin"
                    element={<ProtectedRoute element={<Admin />} allowedRoles={[roleConstans.ADMIN]} />}
                />
                <Route
                    path="/teacher-profile"
                    element={<ProtectedRoute element={<EditTeacherProfile />} allowedRoles={[roleConstans.TEACHER]} />}
                />
                <Route
                    path="/user-profile"
                    element={<ProtectedRoute element={<EditUserProfile />} allowedRoles={[roleConstans.USER]} />}
                />
                <Route path="/find-teacher" element={<ProtectedRoute element={<FindTeacher />} />} />
            </Routes>

            {isModalOpen && <MainModal toggleModal={toggleModal} />}
            {showFooter && <Footer />}
        </AuthProvider>
    );
}

export default App;
