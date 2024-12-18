import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import App from './pages/Login'
import Products from './pages/Products'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<BrowserRouter>
		<Router>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/products' element={<Products />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	</BrowserRouter>,
)
