// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const signin = async (email, password) => {
//         try {
//             const response = await fetch('/api/signin', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUser(data);
//                 setIsAuthenticated(true);
//                 return data;
//             } else {
//                 throw new Error(data.error);
//             }
//         } catch (error) {
//             console.error('Error during signin:', error);
//             return null;
//         }
//     };

//     const signup = async (email, password, role) => {
//         try {
//             const response = await fetch('/api/signup', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password, role }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUser(data);
//                 setIsAuthenticated(true);
//                 return data;
//             } else {
//                 throw new Error(data.error);
//             }
//         } catch (error) {
//             console.error('Error during signup:', error);
//             return null;
//         }
//     };

//     const signout = async () => {
//         try {
//             await fetch('/api/signout', { method: 'POST' });
//             setUser(null);
//             setIsAuthenticated(false);
//         } catch (error) {
//             console.error('Error during signout:', error);
//         }
//     };

//     const authValue = {
//         user,
//         isAuthenticated,
//         signin,
//         signup,
//         signout,
//     };

//     return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
