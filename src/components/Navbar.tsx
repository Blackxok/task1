import { Link } from 'react-router-dom'

const Navbar = ({ username }: { username: string }) => {
	return (
		<nav className='bg-blue-500 p-4 flex px-10'>
			<div>
				<Link to='/products' className='text-white hover:text-gray-300'>
					Products
				</Link>
			</div>
			<div className='ml-auto'>
				<span className='text-sm font-medium text-gray-300'>Hello, {username}</span>
			</div>
		</nav>
	)
}

export default Navbar
