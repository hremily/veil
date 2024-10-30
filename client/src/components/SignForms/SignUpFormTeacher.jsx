import React from 'react';
import AuthForm from './AuthForm';

const SignUpTeacherForm = () => {
    return (
        <AuthForm
            title="Create an Account"
            buttonText="Sign up"
            linkText="Sign up like a student!"
            linkUrl="/signup-user"
            linkText2="Have an account? Sign in"
            linkUrl2="/signin"
        />
    );
};

export default SignUpTeacherForm;
