import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/authSlice";
import statSlice from "@/store/statSlice";
import playSlice from "@/store/playSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		stats: statSlice,
		play: playSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
