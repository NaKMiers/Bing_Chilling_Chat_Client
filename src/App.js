import { useSelector } from 'react-redux'
import { Routes } from 'react-router-dom'
import './App.css'
import LoginLogoutModal from './components/LoginLogoutModal'
import ProfileModal from './components/ProfileModal'
import SecurityModal from './components/SecurityModal'
import routes from './routes'

function App() {
   console.log(process.env.REACT_APP_API_SERVER)
   console.log(process.env.REACT_APP_SOCKET_SERVER)
   const curModal = useSelector(state => state.userReducer.curModal)

   const renderModals = () => {
      switch (curModal) {
         case 'profile':
            return <ProfileModal />
         case 'change-password':
            return <SecurityModal />
         case 'login':
            return <LoginLogoutModal />
         case 'new-room':
         default:
            return null
      }
   }

   return (
      <div className='App'>
         <Routes>{routes()}</Routes>

         {renderModals()}
      </div>
   )
}

export default App
