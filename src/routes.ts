import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
export default [
	index("./pages/auth/login.tsx"),
	route("/sign-up", "./pages/auth/signup.tsx"),
	layout("./pages/play/layout.tsx", [route("play", "./pages/play/play.tsx")]),
	route("*", "./catchall.tsx"),
	...(await flatRoutes()),
] satisfies RouteConfig;
