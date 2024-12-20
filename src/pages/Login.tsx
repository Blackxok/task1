import { Eye, EyeOff } from 'lucide-react' // Add the eye icons
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Login = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false) // State for password visibility

	const handleLogin = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()

			try {
				const response = await fetch('https://crudproduct.pythonanywhere.com/api/login/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password }),
				})
				if (response.ok) {
					const data = await response.json()
					const accessToken = data.access
					const refreshToken = data.refresh
					localStorage.setItem('accessToken', accessToken)
					localStorage.setItem('refreshToken', refreshToken)
					localStorage.setItem('username', username)
					navigate('/products')
				} else {
					alert("Login yoki parol noto'g'ri")
				}
			} catch (error) {
				console.error('Xatolik yuz berdi:', error)
				alert("Server bilan bog'lanishda xatolik yuz berdi")
			}
		},
		[username, password, navigate],
	)

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				handleLogin(e)
			}
		},
		[handleLogin],
	)

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className='w-full h-screen flex justify-center items-center p-4'>
			<div className='w-full sm:w-[400px] p-8 border rounded-lg shadow-md'>
				<h2 className='text-center text-3xl mb-4'>Login</h2>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div className='mb-4'>
						<label htmlFor='username' className='block text-sm font-medium text-gray-400 mb-2'>
							Username
						</label>
						<Input
							id='username'
							type='text'
							value={username}
							onChange={handleUsernameChange}
							onKeyDown={handleKeyDown}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter your username'
						/>
					</div>

					<div className='mb-6 relative'>
						<label htmlFor='password' className='block text-sm font-medium text-gray-400 mb-2'>
							Password
						</label>
						<div className='password-input flex items-center justify-center'>
							<Input
								id='password'
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={handlePasswordChange}
								onKeyDown={handleKeyDown}
								className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter your password'
							/>
							<button
								type='button'
								onClick={togglePasswordVisibility}
								className='absolute right-[10px] text-gray-300 p-0 bg-transparent outline-none focus:outline-none focus:ring-0 hover:outline-none hover:border-none'
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
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
