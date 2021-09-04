export enum ROUTE {
  HOME = '/',
  USERS = '/users/',
  USER_PROFILE = '/users/:userId/',
  USER_ACTIVITY = `/users/:userId/activities/:activityId/`,
  ART_VIEWER = '/artviewer/',
  DESIGN = '/design/',
  DASHBOARD = '/dashboard/'
}


type TArgs =
  | { path: ROUTE.HOME }
  | { path: ROUTE.USERS }
  | { path: ROUTE.USER_PROFILE; params: { userId: string } }
  | {
    path: ROUTE.USER_ACTIVITY;
    params: { userId: string; activityId: string };
  }
  | { path: ROUTE.ART_VIEWER }
  | { path: ROUTE.DESIGN }
  | { path: ROUTE.DASHBOARD }


type TArgsWithParams = Extract<TArgs, { path: any; params: any }>;

export const createPath = (args: TArgs) => {
  // Save some CPU power for routes without params
  if (args.hasOwnProperty('params') === false) return args.path;

  // Create a path by replacing params in the route definition
  return Object.entries((args as TArgsWithParams).params).reduce(
    (previousValue: string, [param, value]) =>
      previousValue.replace(`:${param}`, '' + value),
    args.path
  );
}