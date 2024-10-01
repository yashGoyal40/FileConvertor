import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { Csvtojson, Jsontocsv, SignUp, Login, Content } from './components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element:<Content />},
      { path: "csvtojson", element: <Csvtojson /> },
      { path: "jsontocsv", element: <Jsontocsv /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/signup", element: <SignUp /> },

    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
