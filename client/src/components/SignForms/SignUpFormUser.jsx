import React from 'react';
import AuthForm from './AuthForm';

const SignUpFormUser = () => {
    return (
        <AuthForm
            title="Create an Account"
            buttonText="Sign up"
            linkText="Sign up like a teacher!"
            linkUrl="/signup-teacher"
            linkText2="Have an account? Sign in"
            linkUrl2="/signin"
        />
    );
};

export default SignUpFormUser;
