import { createSlice } from "@reduxjs/toolkit";
export type BoardType = [
	[number, number, number],
	[number, number, number],
	[number, number, number],
];

type GameStateType = {
	current_player: "X" | "O";
	is_game_over: boolean;
	winner: number;
	is_draw: boolean;
	status: "win" | "ongoing" | "draw";
	next_move: [number, number];
	board: BoardType;
};

type StatsState = {
	game_status: GameStateType;
	current_player: string;
	current_move: [number, number];
	play_board: BoardType;
};

const initialState: StatsState = {
	current_player: "",
	current_move: [0, 0],
	play_board: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	],
	game_status: {
		current_player: "X",
		is_game_over: false,
		winner: 0,
		is_draw: false,
		status: "ongoing",
		next_move: [0, 0],
		board: [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		],
	},
};

const playSlice = createSlice({
	name: "play",
	initialState,
	reducers: {
		setGameStatus: (state, action) => {
			console.log("action:", action.payload);
			state.game_status = {
				...state.game_status,
				...action.payload,
			};
			if (action.payload.board) {
				state.play_board = action.payload.board;
			}
		},
		setCurrentPlayer: (state, action) => {
			state.current_player = action.payload;
		},
		setCurrentMove: (state, action) => {
			state.current_move = action.payload;
		},
		setCurrentPlayBoard: (state, action) => {
			let left = 0;
			let right = 0;

			if (action.payload < 3) {
				left = 0;
				right = action.payload;
			}

			if (action.payload >= 3 && action.payload < 6) {
				left = 1;
				right = action.payload - 3;
			}

			if (action.payload >= 6 && action.payload <= 8) {
				left = 2;
				right = action.payload - 6;
			}

			state.play_board[left][right] = state.current_player == "X" ? -1 : 1;
		},
		setBoard: (state, action) => {
			state.play_board = action.payload;
		},
		resetGame: (state) => {
			state.play_board = [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			];
			state.current_player = "X";
			state.game_status = {
				current_player: "X",
				is_game_over: false,
				winner: 0,
				is_draw: false,
				status: "ongoing",
				next_move: [0, 0],
				board: [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				],
			};
		},
		switchPlayer: (state) => {
			state.current_player = state.current_player === "O" ? "X" : "O";
		},
	},
});

export const {
	setGameStatus,
	setCurrentPlayer,
	setCurrentMove,
	setCurrentPlayBoard,
	setBoard,
	resetGame,
	switchPlayer,
} = playSlice.actions;

export default playSlice.reducer;
