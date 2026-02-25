import React from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { Home } from './pages/Home';
import { Level } from './pages/Level';
import { LevelComplete } from './pages/LevelComplete';
import { LevelFailed } from './pages/LevelFailed';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Level route
const levelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/level/$levelId',
  component: Level,
});

// Level Complete route
const levelCompleteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/level-complete',
  component: LevelComplete,
  validateSearch: (search: Record<string, unknown>) => ({
    level: Number(search.level ?? 1),
    score: Number(search.score ?? 0),
  }),
});

// Level Failed route
const levelFailedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/level-failed',
  component: LevelFailed,
  validateSearch: (search: Record<string, unknown>) => ({
    level: Number(search.level ?? 1),
    score: Number(search.score ?? 0),
  }),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  levelRoute,
  levelCompleteRoute,
  levelFailedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
