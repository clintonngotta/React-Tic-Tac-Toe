import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Trophy, Target, Award, BarChart3 } from "lucide-react";

export const StatsComponent = () => {
	const { stats } = useSelector((state: RootState) => state.stats);
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
			<div className={`bg-white rounded-xl shadow-md p-6 border-l-4 `}>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-600 text-sm font-medium'>Total Games</p>
						<p className='text-3xl font-bold text-gray-900 mt-1'>
							{stats.wins + stats.draws + stats.losses}
						</p>
					</div>
					<div className={`p-3 rounded-full`}>
						<BarChart3 />
					</div>
				</div>
			</div>
			<div className={`bg-white rounded-xl shadow-md p-6 border-l-4 `}>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-600 text-sm font-medium'>Wins</p>
						<p className='text-3xl font-bold text-gray-900 mt-1'>
							{stats.wins}
						</p>
					</div>
					<div className={`p-3 rounded-full`}>
						<Target />
					</div>
				</div>
			</div>
			<div className={`bg-white rounded-xl shadow-md p-6 border-l-4 `}>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-600 text-sm font-medium'>Draws</p>
						<p className='text-3xl font-bold text-gray-900 mt-1'>
							{stats.draws}
						</p>
					</div>
					<div className={`p-3 rounded-full`}>
						<Award />
					</div>
				</div>
			</div>
			<div className={`bg-white rounded-xl shadow-md p-6 border-l-4 `}>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-600 text-sm font-medium'>Losses</p>
						<p className='text-3xl font-bold text-gray-900 mt-1'>
							{stats.losses}
						</p>
					</div>
					<div className={`p-3 rounded-full`}>
						<Trophy />
					</div>
				</div>
			</div>
		</div>
	);
};
