import React from 'react';
import Footer from './components/Footer/Footer';
import SignUpTeacher from './pages/SignUp/SignUpTeacher';
import SignUpUser from './pages/SignUp/SignUpUser';
import SignIn from './pages/SignIn/SignIn';

function App() {
    return (
        <>
            <SignUpTeacher />
            <SignUpUser />
            <Footer />
        </>
    );
}

export default App;
