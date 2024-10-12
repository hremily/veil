import React from 'react';
import Footer from './components/Footer/Footer';
import SignUpTeacher from './pages/SignPages/SignUpTeacher.jsx';
import SignIn from './pages/SignPages/SignIn.jsx';
import SignUpUser from './pages/SignPages/SignUpUser.jsx';
function App() {
    return (
        <>
            <SignIn />
            <SignUpTeacher />
            <SignUpUser />
            <Footer />
        </>
    );
}

export default App;
