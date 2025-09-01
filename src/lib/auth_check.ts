import { redirect } from "react-router";
import { store } from "@/store/store";

export function requireAuth() {
	const { isAuthenticated } = store.getState().auth;

	if (!isAuthenticated) {
		throw redirect("/");
	}
}

export function redirectIfAuthenticated() {
	const { isAuthenticated } = store.getState().auth;

	if (isAuthenticated) {
		throw redirect("/play");
	}
}
