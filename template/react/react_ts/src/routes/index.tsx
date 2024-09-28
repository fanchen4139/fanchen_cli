import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";
import About from "../views/about";
import StateParams from "../views/navigateDemo/stateParams";
import BasicLayout from "../views/baiscLayout";
import Login from "@/views/login";

const Home = lazy(() => import("../views/home"))
const Params = lazy(() => import("../views/navigateDemo/params"))
const SearchParams = lazy(() => import("../views/navigateDemo/searchParams"))
const NavigateDemo = lazy(() => import("../views/navigateDemo"))
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