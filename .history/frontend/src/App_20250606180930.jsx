
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import HRPeersDashboard from './Dashboard'
import LinkedInNavigation from './LinkedlnNavigation'
import ProfilePage from './ProfilePage'
import LegalAndPolicy from './Legal'
import PrivacySettings from './Privacy'
import NotificationsPage from './ProfileNotification'
import LiveEventsApp from './Events'
import UploadPage from './Add'
import SplashScreen from './SplashScreen'
import NewChat from './NewChat' 
import LinkedinCallback from './auth/LinkedinCallback'
import LinkedinSuccess from './auth/LinkedinSuccess'
// import { PostProvider } from './PostContext'
function App() {
  return (
    <>
   {/* <PostProvider> */}
      <Routes>
        <Route path='/' element={<SplashScreen/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dashboard' element={<HRPeersDashboard/>}/>
        <Route path='/header' element={<Headers/>}/>
        <Route path='/footer' element={<LinkedInNavigation/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profile/legal' element={<LegalAndPolicy/>}/>
        <Route path='/profile/privacy' element={<PrivacySettings/>}/>
        <Route path='/profile/notifications' element={<NotificationsPage/>}/>
        <Route path='/msg' element={<NewChat/>}/>
        <Route path='/events' element={<LiveEventsApp/>}/>
        <Route path='/add' element={<UploadPage/>}/>
        <Route path="/linkedin-callback" element={<LinkedinCallback />} />
        <Route path='/linkedin-success' element={<LinkedinSuccess/>}/>
      </Routes>
      {/* </PostProvider> */}
    </>
  )
}

export default App
