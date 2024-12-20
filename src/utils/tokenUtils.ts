import { jwtDecode } from 'jwt-decode'

export const getAccessToken = (): string | null => {
	return localStorage.getItem('accessToken')
}

export const getRefreshToken = (): string | null => {
	return localStorage.getItem('refreshToken')
}

export const isTokenExpired = (token: string | null): boolean => {
	if (!token) return true

	const decoded: { exp?: number } = jwtDecode(token)
	const currentTime = Math.floor(Date.now() / 1000)

	return decoded.exp !== undefined && decoded.exp < currentTime
}

export const refreshAccessToken = async (): Promise<string | null> => {
	const refreshToken = getRefreshToken()
	if (!refreshToken) {
		console.error('Refresh token mavjud emas!')
		return null
	}

	try {
		const response = await fetch('https://crudproduct.pythonanywhere.com/api/token/refresh/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh: refreshToken }),
		})

		if (!response.ok) throw new Error('Failed to refresh token')

		const data = await response.json()
		const newAccessToken = data.access

		localStorage.setItem('accessToken', newAccessToken)
		return newAccessToken
	} catch (error) {
		console.error('Error refreshing token:', error)
		return null
	}
}

export const getValidAccessToken = async (): Promise<string | null> => {
	const accessToken = getAccessToken()

	if (accessToken && !isTokenExpired(accessToken)) {
		return accessToken
	}

	const newAccessToken = await refreshAccessToken()
	return newAccessToken
}
