import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IngresoNotas from './pages/IngresoNotas.jsx';
import AuthForm from './pages/AuthForm.jsx';
import SavedNotes from './pages/SavedNotes.jsx';
import ListarUsuarios from './pages/ListarUsuarios.jsx';
import UserAdminLayout from './pages/UserAdminLayout.jsx';
import CrearUsuario from './pages/CrearUsuario.jsx';

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
    path: '/user-admin',
    element: <UserAdminLayout />,
    children: [
      {
        path: 'listarUsuarios',
        element: <ListarUsuarios />
      },
    ]
  }
]);

export default function App () {
    return(
      <RouterProvider router={routes}></RouterProvider>
    )
}