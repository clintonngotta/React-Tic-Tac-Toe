import { Outlet } from "react-router";

export default function PlayLayout() {
	return (
		<div className='flex flex-col min-h-[70vh] h-screen w-full items-center justify-center px-4'>
			<Outlet />
		</div>
	);
}
