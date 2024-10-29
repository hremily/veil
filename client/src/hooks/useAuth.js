import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
    const { setUser } = useContext(AuthContext);

    const login = async (userData) => {
        setUser(userData);
    };

    return { login };
};

export default useAuth;
