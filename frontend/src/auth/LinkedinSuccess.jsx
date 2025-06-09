import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedinSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      alert("LinkedIn login failed. No token found.");
      navigate('/');
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default LinkedinSuccess;
