import { Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DevInfoPage from '../pages/DevInfoPage'

const routes = [
   {
      path: '/',
      exact: true,
      element: <HomePage />,
   },
   {
      path: '/dev-info',
      exact: true,
      element: <DevInfoPage />,
   },
]

const renderRoutes = () =>
   routes.map(route => (
      <Route key={route.path} path={route.path} exact={route.exact} element={route.element} />
   ))

export default renderRoutes
