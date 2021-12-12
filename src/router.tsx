import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Dashboard = Loader(lazy(() => import('src/content/dashboards')));
const Networks = Loader(lazy(() => import('src/content/networks')))
const Tokens = Loader(lazy(() => import('src/content/tokens')))
const Farms = Loader(lazy(() => import('src/content/farms')))
const Routers = Loader(lazy(() => import('src/content/routers')))
const Pools = Loader(lazy(() => import('src/content/pools')))
const Compounders = Loader(lazy(() => import('src/content/compounders')))

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboard"
            replace
          />)
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboard',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ]
  },
  {
    path: 'networks',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Networks />,
      },
    ]
  },
  {
    path: 'tokens',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Tokens />,
      },
    ]
  },
  {
    path: 'farms',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Farms />,
      },
    ]
  },
  {
    path: 'routers',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Routers />,
      },
    ]
  },
  {
    path: 'pools',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Pools />,
      },
    ]
  },
  {
    path: 'compounders',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Compounders />,
      },
    ]
  },
  
  
];

export default routes;
