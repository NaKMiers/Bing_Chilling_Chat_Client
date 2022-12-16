import { Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SettingPage from '../pages/SettingPage'

const routes = [
   {
      path: '/',
      exact: true,
      element: <HomePage />,
   },
   {
      path: '/setting',
      exact: true,
      element: <SettingPage />,
   },
]

const renderRoutes = () =>
   routes.map(route => (
      <Route key={route.path} path={route.path} exact={route.exact} element={route.element} />
   ))

export default renderRoutes
