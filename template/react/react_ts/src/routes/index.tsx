import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";
import About from "../pages/about";
import StateParams from "../pages/navigateDemo/stateParams";
import BasicLayout from "../pages/baiscLayout";
import Login from "../pages/login.tsx";

const Home = lazy(() => import("../pages/home"))
const Params = lazy(() => import("../pages/navigateDemo/params"))
const SearchParams = lazy(() => import("../pages/navigateDemo/searchParams"))
const NavigateDemo = lazy(() => import("../pages/navigateDemo"))
const routes = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        path: 'navigate',
        element: <NavigateDemo></NavigateDemo>
      },
      {
        path: 'home',
        element: <Home></Home>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/basicLayout',
    element: <BasicLayout />
  },
  {
    path: '/navigate',
    element: <NavigateDemo />,
    children: [
      {
        path: 'params/:id',
        element: <Params />
      },
      {
        path: 'searchParams',
        element: <SearchParams />
      },
      {
        path: 'stateParams',
        element: <StateParams> 123</StateParams>
      },
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  },
])

export default routes