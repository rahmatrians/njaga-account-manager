import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import Platform from "../pages/Platform";
import Setting from "../pages/Setting";
import Login from "../pages/Authentication/login";
import NotFound404 from "../pages/NotFound404";
import Add from "../pages/Category/add";

export const Router = createBrowserRouter([
    {
        path: "",
        element: <Navigate to={'dashboard'} />,
        errorElement: <NotFound404 />
    },
    {
        path: "auth/login",
        element: <Login />,
        // errorElement: 
    },
    {
        path: "dashboard",
        index: true,
        element: <PrivateRoute breadcumb={[
            { path: 'dashboard', title: 'Dashboard' },
        ]}><Dashboard /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "category",
        element: <PrivateRoute breadcumb={[
            { path: 'category', title: 'Category' },
            { path: 'list', title: 'List' },
        ]}><Category /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "platform",
        element: <PrivateRoute breadcumb={[
            { path: 'platform', title: 'Platform' },
            { path: 'list', title: 'List' },
        ]}><Platform /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "partners/add",
        element: <PrivateRoute breadcumb={[
            { path: 'partners', title: 'Partners' },
            { path: 'add', title: 'Add' },
        ]}><Add /></PrivateRoute>,
        // errorElement: 
    },

    {
        path: "setting",
        element: <PrivateRoute breadcumb={[
            { path: 'setting', title: 'Setting' },
            { path: 'list', title: 'List' },
        ]}><Setting /></PrivateRoute>,
        // errorElement: 
    },
]);