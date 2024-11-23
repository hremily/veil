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

import { AuthProvider } from './routes/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';
import ResetForm from './components/Reset/ResetForm';

function App() {
    return (
        <AuthProvider>
            {showHeader && <Header />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup-user" element={<SignUpUser />} />
                <Route path="/signup-teacher" element={<SignUpTeacher />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/reset" element={<ResetForm />} />

                <Route path="/categories" element={<Categories />} />
                <Route path="/profile" element={<ViewUserPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/teacher-profile" element={<EditTeacherProfile />} />
                <Route path="/user-profile" element={<EditUserProfile />} />
                <Route path="/findteacher" element={<FindTeacher />} />
            </Routes>

            {isModalOpen && <MainModal toggleModal={toggleModal} />}
            {showFooter && <Footer />}
        </AuthProvider>
    );
}

export default App;
