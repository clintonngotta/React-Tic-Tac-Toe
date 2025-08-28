import { Link } from "react-router";

export default function loader() {
	return (
		<div className='flex flex-col min-h-[50vh] h-screen w-full items-center justify-center px-4'>
			<h1 className='text-red-800 font-bold text-2xl py-2'>
				404 - Page Not Found
			</h1>
			<p className='pb-2'>Sorry, the page you're looking for doesn't exist.</p>
			<Link to='/' className='text-primary'>
				Go back to Home
			</Link>
		</div>
	);
}
