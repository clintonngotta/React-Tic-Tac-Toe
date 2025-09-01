import { createSlice } from "@reduxjs/toolkit";

type StatsType = {
	wins: number;
	losses: number;
	draws: number;
};

type StatsState = {
	stats: StatsType;
	loading: boolean;
};

const initialState: StatsState = {
	stats: {
		wins: 0,
		losses: 0,
		draws: 0,
	},
	loading: false,
};

const statSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		setUserStats: (state, action) => {
			state.loading = false;
			state.stats = action.payload.data[0];
		},
	},
});

export const { setUserStats } = statSlice.actions;
export default statSlice.reducer;
