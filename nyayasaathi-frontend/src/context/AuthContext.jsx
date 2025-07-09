import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check login status when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await apiClient.get('/auth/status');
        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Session check failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      // The cookie is set automatically by the browser. We just update the state.
      const statusRes = await apiClient.get('/auth/status');
      if (statusRes.data.loggedIn) {
        setUser(statusRes.data.user);
        navigate('/dashboard');
      }
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error.response.data;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const authValue = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);