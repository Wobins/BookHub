import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Accueil from './pages/home';
import Bibliotheque from './pages/books';
import Prets from './pages/loans';
import DefaultLayout from './layouts/default';
import Borrowings from './pages/borrowings';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/home",
    element: <DefaultLayout children={<Accueil />} />,
  },
  {
    path: "/books",
    element: <DefaultLayout children={<Bibliotheque />} />,
  },
  {
    path: "/loans",
    element: <DefaultLayout children={<Prets />} />,
  },
  {
    path: "/borrowings",
    element: <DefaultLayout children={<Borrowings />} />,
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
