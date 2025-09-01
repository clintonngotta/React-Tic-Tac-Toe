import { createSlice } from "@reduxjs/toolkit";
interface UserType {
	name: string;
	email: string;
	userId: string;
}

interface authType {
	user: UserType;
	isAuthenticated: boolean;
	token: string;
	loading: boolean;
}

const initialState: authType = {
	isAuthenticated: false,
	user: {
		userId: "",
		email: "",
		name: "",
	},
	token: "",
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		loginFailure: (state) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = {
				userId: "",
				email: "",
				name: "",
			};
			state.token = "";
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = {
				userId: "",
				email: "",
				name: "",
			};
			state.token = "";
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	authSlice.actions;
export default authSlice.reducer;
