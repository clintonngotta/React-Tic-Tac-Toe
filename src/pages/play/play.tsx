import { Card } from "@/components/ui/card";

export default function PlayPage() {
	return (
		<div className='grid grid-cols-3 gap-2 w-100 h-80 mx-auto'>
			{Array.from(Array(9).keys()).map((board) => (
				<Card
					key={board}
					className='text-center items-center justify-center transition-all duration-200 shadow-sm aspect-square hover:scale-105'>
					{board}
				</Card>
			))}
		</div>
	);
}
