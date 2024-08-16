import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IngresoNotas from './pages/IngresoNotas.jsx';
import AuthForm from './pages/AuthForm.jsx';
import SavedNotes from './pages/SavedNotes.jsx';
import ListarUsuarios from './pages/ListarUsuarios.jsx';
import UserAdminLayout from './pages/UserAdminLayout.jsx';
import ListAges from './pages/ListAges.jsx';
import AdminAgeRanges from './pages/AdminAgeRanges.jsx';

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
      {
        path: 'edit-user/:id',
        element: <AuthForm />
      },
      {
        path: 'create-user',
        element: <AuthForm />
      },
      {
        path: 'list-ages',
        element: <ListAges />
      },
      {
        path: 'edit-age/:id',
        element: <AdminAgeRanges />
      },
      {
        path: 'create-age',
        element: <AdminAgeRanges />
      }
    ]
  }
]);

export default function App () {
    return(
      <RouterProvider router={routes}></RouterProvider>
    )
}