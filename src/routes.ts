import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
export default [
	index("./pages/auth/login.tsx"),
	route("*", "./catchall.tsx"),
	...(await flatRoutes()),
] satisfies RouteConfig;
