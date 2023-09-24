import './index.css'

import * as ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { Router } from './routes/Router.jsx';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <RouterProvider router={Router} />
  </AuthContextProvider>
  // </React.StrictMode>
);
