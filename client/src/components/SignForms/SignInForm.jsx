import React from 'react';
import AuthForm from './AuthForm';

const SignIn = () => {
    return (
        <AuthForm
            title="Enter to the Account"
            buttonText="Sign in"
            linkText="Don't have an account?"
            linkUrl="/signup-user"
            linkText2="Reset password"
            linkUrl2="/reset"
        />
    );
};

export default SignIn;
