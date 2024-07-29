import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IngresoNotas from './pages/IngresoNotas.jsx';
import AuthForm from './pages/AuthForm.jsx';
import SavedNotes from './pages/SavedNotes.jsx';

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
  }
]);

export default function App () {
    return(
      <RouterProvider router={routes}></RouterProvider>
    )
}