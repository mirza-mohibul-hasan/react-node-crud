import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    
  },
  {
    path:"add",
    element:<Add></Add>
  },
  {
    path:"update/:id",
    element:<Update></Update>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
