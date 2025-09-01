import { Card } from "@/components/ui/card";
import { gamePlayAction } from "@/pages/actions/auth";
import {
	setBoard,
	setCurrentPlayBoard,
	setCurrentPlayer,
	setGameStatus,
	switchPlayer,
} from "@/store/playSlice";
import { store, type RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BoardComponent() {
	const dispatch = useDispatch();
	const { current_player, play_board, game_status } = useSelector(
		(state: RootState) => state.play
	);

	const play = async (move: number) => {
		await playNow(move);
	};

	// for computer to start
	useEffect(() => {
		const fetchComputerMove = async () => {
			const latestState = store.getState().play;
			const res = await gamePlayAction({
				current_player: "O",
				state: latestState.play_board,
			});
			if (res.success) {
				dispatch(setGameStatus(res));
				if (res.board) {
					dispatch(setBoard(res.board));
				}
				dispatch(setCurrentPlayer("X"));
			}
		};
		if (current_player == "O" && !game_status.is_game_over) {
			fetchComputerMove();
		}
	}, []);

	const playNow = async (move: number) => {
		dispatch(setCurrentPlayBoard(move));

		const latestState = store.getState().play;
		const res = await gamePlayAction({
			current_player: current_player,
			state: latestState.play_board,
		});

		if (res.success) {
			dispatch(setCurrentPlayBoard(res.board));
			dispatch(setGameStatus(res));
			dispatch(switchPlayer());
		}
	};
	return (
		<div>
			<div className='mb-4 text-center'>
				{game_status.is_game_over ? (
					<div className='space-y-2'>
						{game_status.is_draw && (
							<p className='text-gray-600 font-semibold text-lg'>DRAW</p>
						)}
						{!game_status.is_draw && game_status.winner === -1 && (
							<p className='text-blue-600 font-semibold text-lg'>YOU WIN</p>
						)}
						{!game_status.is_draw && game_status.winner === 1 && (
							<p className='text-orange-600 font-semibold text-lg'>
								COMPUTER WINS
							</p>
						)}
					</div>
				) : current_player === "X" ? (
					<p className='text-blue-600'>Your Turn</p>
				) : (
					<p className='text-orange-600'>Computer's Turn</p>
				)}
			</div>
			<div className='grid grid-cols-3 gap-2 w-100 h-80 mx-auto'>
				{play_board.flat().map((cell, index) => {
					const isClickable = cell === 0 && !game_status.is_game_over;

					return (
						<Card
							key={index}
							onClick={() => cell === 0 && play(index)}
							className={`text-center flex items-center justify-center transition-all duration-200 shadow-md aspect-square text-2xl font-bold ${
								isClickable
									? "cursor-pointer hover:scale-105 hover:bg-gray-50"
									: "cursor-not-allowed opacity-50"
							} ${game_status.is_game_over ? "pointer-events-none" : ""}`}>
							{cell === -1 ? "X" : cell === 1 ? "O" : ""}
						</Card>
					);
				})}
			</div>
		</div>
	);
}
