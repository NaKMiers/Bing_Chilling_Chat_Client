import { Routes } from 'react-router-dom'
import './App.css'
import routes from './routes'

function App() {
   console.log(process.env.REACT_APP_API_SERVER)
   console.log(process.env.REACT_APP_SOCKET_SERVER)

   return (
      <div className='App'>
         <Routes>{routes()}</Routes>
      </div>
   )
}

export default App
