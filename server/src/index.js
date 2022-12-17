import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
} from "react-router-dom";
import Welcome from './Welcome';
import User from './User';


const root = ReactDOM.createRoot(document.getElementById('root'));

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Welcome/>
  },{
    path: "/:username",
    element: <User />
  }
])


root.render(
    <RouterProvider router={reactRouter}/>
);

