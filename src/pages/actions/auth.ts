"use server";
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
		console.log("response:", response);
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
