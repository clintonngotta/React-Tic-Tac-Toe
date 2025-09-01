import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Computer, LogOut, Signal, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BoardComponent from "@/components/player-board";
import { useState } from "react";

import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router";
import { StatsComponent } from "@/components/stats-component";
import { fetchUserStatsAction } from "../actions/auth";
import { setUserStats } from "@/store/statSlice";
import { setCurrentPlayer, resetGame } from "@/store/playSlice";

export default function PlayPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [page, setPage] = useState("play");
	const { user } = useSelector((state: RootState) => state.auth);
	const { current_player, game_status } = useSelector(
		(state: RootState) => state.play
	);

	const logoutNow = () => {
		dispatch(logout());
		navigate("/");
	};

	const fetchStats = async () => {
		setPage("stats");
		const statsRes = await fetchUserStatsAction();
		if (statsRes.success) {
			await dispatch(setUserStats(statsRes));
		}
	};

	const selectStartPlayer = (player: string = "X") => {
		dispatch(resetGame());
		dispatch(setCurrentPlayer(player));
		setPage(player);
	};

	const backToSelection = () => {
		setPage("play");
		dispatch(resetGame());
	};

	return (
		<div className='min-h-screen p-4'>
			<div className='max-w-4xl mx-auto mb-4'>
				<div className='rounded-2xl p-8'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
							Tic Tac Toe
						</h1>
						<p className='text-gray-600'>Welcome back, {user?.name}!</p>
					</div>

					{page === "play" && (
						<div className='text-center'>
							<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
								Who goes first?
							</h2>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Button
									onClick={() => selectStartPlayer("X")}
									className='cursor-pointer flex items-center justify-center gap-3 px-4 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
									<UserIcon className='w-6 h-6' />
									I'll Start (X)
								</Button>
								<Button
									onClick={() => selectStartPlayer("O")}
									className='cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'>
									<Computer className='w-6 h-6' />
									Computer Starts (O)
								</Button>
								<Button
									onClick={() => fetchStats()}
									className='cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
									<Signal className='w-6 h-6' />
									Stats
								</Button>
								<Button
									onClick={() => logoutNow()}
									className='cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'>
									<LogOut className='w-6 h-6' />
									Logout
								</Button>
							</div>
						</div>
					)}

					{(page === "X" || page === "O") && (
						<div className='text-center mb-4'>
							<Button
								onClick={() => backToSelection()}
								className='mb-4 bg-gray-500 hover:bg-gray-600'>
								← Back to Menu
							</Button>
							{game_status.is_game_over && (
								<Button
									onClick={() => selectStartPlayer(current_player)}
									className='ml-2 bg-blue-500 hover:bg-blue-600'>
									Play Again
								</Button>
							)}
						</div>
					)}
				</div>
			</div>

			{(page === "X" || page === "O") && <BoardComponent />}
			{page === "stats" && (
				<>
					<StatsComponent />
					<div className='text-center mb-4'>
						<Button
							onClick={() => backToSelection()}
							className='mb-4 bg-gray-500 hover:bg-gray-600'>
							← Back to Menu
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
