import React from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from '../../context/AuthContext';

describe('<AuthForm />', () => {
    beforeEach(() => {
        cy.mount(
            <AuthForm
                title="Sign in"
                buttonText="Sign in"
                linkText="Don't have an account?"
                linkUrl="/signup"
                linkText2="Forgot Password?"
                linkUrl2="/reset-password"
            />,
        );
    });

    it('renders auth', () => {
        cy.getByDataCy('auth-form').should('exist');
    });
});
