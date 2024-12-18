import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Login = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		if (username === 'admin' && password === '1234') {
			navigate('/products')
		} else {
			alert("Login yoki parol noto'g'ri")
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleLogin(e)
		}
	}

	return (
		<div className='w-[30%] h-screen flex justify-center items-center p-4'>
			<div className='p-8 border rounded-lg shadow-md w-full'>
				<h2 className='text-center text-3xl'>Login</h2>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div className='mb-4'>
						<label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
							Username
						</label>
						<Input
							id='username'
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter your username'
						/>
					</div>

					<div className='mb-6'>
						<label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
							Password
						</label>
						<Input
							id='password'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter your password'
						/>
					</div>

					<Button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						Login
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Login
