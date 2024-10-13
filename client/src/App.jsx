import React from 'react';
import Footer from './components/Footer/Footer';
import SignUpTeacher from './pages/SignPages/SignUpTeacher.jsx';
import SignIn from './pages/SignPages/SignIn.jsx';
import SignUpUser from './pages/SignPages/SignUpUser.jsx';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/Main/HomePage.jsx';
import Questionary from './components/Questionary/Questionary.jsx';
import TextMain from './components/TextMain/TextMain.jsx';
function App() {
    return (
        <>
            <HomePage/>
            {/* <SignIn />
            <SignUpTeacher />
            <SignUpUser />
            <Footer /> */}
        </>
    );
}

export default App;
