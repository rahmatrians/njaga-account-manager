import React from 'react'
import './index.css'

import * as ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { Router } from './routes/Router.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
