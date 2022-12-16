import { Routes } from 'react-router-dom'
import './App.css'
import routes from './routes'

function App() {
   return (
      <div className='App'>
         <Routes>{routes()}</Routes>
      </div>
   )
}

export default App
