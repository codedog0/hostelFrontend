import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css';
import Spinner from '../components/spinner'; // Import the Spinner component
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if access_token exists in localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/Leaderboards'); // Redirect to /dashboard if token exists
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        `${apiUrl}/signIn?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`, // Query parameters in URL
        null // No body for the POST request
      );

      console.log('Login successful:', response.data);

      if (response.data?.access_token) {
        // Save token to localStorage or context if needed
        localStorage.setItem('access_token', response.data.access_token);

        // Redirect to /dashboard
        navigate('/Leaderboards');
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        {errorMessage && (
          <div className={styles.error}>
            {errorMessage}
          </div>
        )}
        <label htmlFor="username" className={styles.label}>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;