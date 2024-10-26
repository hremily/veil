import './App.css';

import React from 'react';
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

function App() {
    const location = useLocation();

    const hideHeaderPaths = ['/signin', '/signup-teacher', '/signup-user'];
    const hideFooterPaths = ['/signin', '/signup-teacher', '/signup-user'];

    const showHeader = !hideHeaderPaths.includes(location.pathname);
    const showFooter = !hideFooterPaths.includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/profile" element={<ViewUserPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup-user" element={<SignUpUser />} />
                <Route path="/signup-teacher" element={<SignUpTeacher />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/teacher-profile" element={<EditTeacherProfile />} />
                <Route path="/user-profile" element={<EditUserProfile />} />
                <Route path="/find-teacher" element={<FindTeacher />} />
            </Routes>

            {showFooter && <Footer />}
        </>
    );
}

export default App;
