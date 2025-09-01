"use server";

import type { BoardType } from "@/store/playSlice";

const BACKEND_BASE_URL = "http://localhost:5000";

export async function loginAction(formData: {
	password: string;
	email: string;
}) {
	try {
		const send = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		const response = await send.json();
		if (response.message == "Token expired.") {
			window.location.href = "/";
		}
		if (!send.ok) {
			throw new Error(response.detail);
		}

		if (response.message !== "Login successful") {
			throw new Error(response.message || "login error");
		}

		localStorage.setItem("token", response.token);
		return {
			success: true,
			...response,
		};
	} catch (error) {
		const e = error as Error;
		console.log("error:", e);
		console.error("Error login:", e.message);
		return {
			success: false,
			message: e.message,
		};
	}
}

export async function fetchUserStatsAction() {
	try {
		const token = localStorage.getItem("token");
		const send = await fetch(`${BACKEND_BASE_URL}/game/stats`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		const response = await send.json();
		if (response.message == "Token expired.") {
			window.location.href = "/";
		}
		if (!send.ok) {
			throw new Error(response.detail);
		}

		if (response.message != "user stats fetched successully") {
			throw new Error(response.message || "Stats Fetch error");
		}
		return {
			success: true,
			...response,
		};
	} catch (error) {
		const e = error as Error;
		console.log(e);
		return {
			success: false,
			message: e.message,
		};
	}
}

type playInputType = {
	state: BoardType;
	current_player: string;
};

export async function gamePlayAction(data: playInputType) {
	try {
		const token = localStorage.getItem("token");
		const send = await fetch(`${BACKEND_BASE_URL}/game/play`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(data),
		});
		const response = await send.json();

		if (response.message == "Token expired.") {
			window.location.href = "/";
		}
		if (!send.ok) {
			throw new Error(response.detail);
		}

		return {
			success: true,
			...response,
		};
	} catch (error) {
		const e = error as Error;
		console.log(e);
		return {
			success: false,
			message: e.message,
		};
	}
}
