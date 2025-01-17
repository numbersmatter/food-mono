import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layout.tsx', [
    index('routes/home.tsx'),
    ...prefix('semesters', [
      index('routes/semesters/semesters.tsx'),
      route('create', 'routes/semesters/create.tsx'),
      route(':semesterId', 'routes/semesters/semesterId.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
