import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../pages/Dashboard";

import Category from "../pages/Category";
import CategoryAdd from "../pages/Category/add";
import CategoryDetail from "../pages/Category/detail";

import Platform from "../pages/Platform";
import PlatformAdd from "../pages/Platform/add";
import PlatformDetail from "../pages/Platform/detail";

import Setting from "../pages/Setting";

import Login from "../pages/Authentication/login";

import NotFound404 from "../pages/NotFound404";
import PasswordLab from "../pages/PasswordLab";

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
        path: "category/add",
        element: <PrivateRoute breadcumb={[
            { path: 'category', title: 'Category' },
            { path: 'add', title: 'Add' },
        ]}><CategoryAdd /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "category/:id",
        element: <PrivateRoute breadcumb={[
            { path: 'category', title: 'Category' },
            { path: 'detail', title: 'Detail' },
        ]}><CategoryDetail /></PrivateRoute>,
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
        path: "platform/add",
        element: <PrivateRoute breadcumb={[
            { path: 'platform', title: 'Platform' },
            { path: 'add', title: 'Add' },
        ]}><PlatformAdd /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "platform/:id",
        element: <PrivateRoute breadcumb={[
            { path: 'platform', title: 'Platform' },
            { path: 'detail', title: 'Detail' },
        ]}><PlatformDetail /></PrivateRoute>,
        // errorElement: 
    },
    {
        path: "password-lab",
        element: <PrivateRoute breadcumb={[
            { path: 'password-lab', title: 'Password Lab' },
        ]}><PasswordLab /></PrivateRoute>,
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