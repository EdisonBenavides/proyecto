import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IngresoNotas from './pages/IngresoNotas.jsx';
import AuthForm from './pages/AuthForm.jsx';
import SavedNotes from './pages/SavedNotes.jsx';
import UserAdmin from './pages/UserAdmin.jsx';
import ListUsuarios from './pages/ListarUsuarios.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthForm />
  },
  {
    path: '/diario',
    element: <IngresoNotas />
  },
  {
    path: '/historial',
    element: <SavedNotes />
  },
  {
    path:'/user-admin',
    element:<UserAdmin/>
  },
  {
    path:'/listarUsuarios',
    element:<ListUsuarios/>
  }
]);

export default function App () {
    return(
      <RouterProvider router={routes}></RouterProvider>
    )
}