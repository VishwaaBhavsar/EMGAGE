import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedinCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store token (you could decode and store user info too)
      localStorage.setItem('token', token);

      // Clean up URL (remove query params)
      window.history.replaceState({}, document.title, '/');

      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // Optional: Handle error (e.g., token missing)
      alert('LinkedIn login failed or token missing');
      navigate('/');
    }
  }, [navigate]);
return (
  <div>
    Logging you in via LinkedIn...
    <span id="redirect-uri" style={{ display: 'none' }}>
      http://localhost:5173/linkedin-callback
    </span>
  </div>
);

};

export default LinkedinCallback;
