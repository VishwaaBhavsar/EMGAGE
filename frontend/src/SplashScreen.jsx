// SplashScreen.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SplashScreen.css'

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home') // Redirect to home page
    }, 3000) // Show for 3 seconds

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-screen">
      <video autoPlay muted playsInline className="splash-video">
        <source src="/v.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default SplashScreen
