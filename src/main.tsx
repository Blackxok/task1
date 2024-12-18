import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import App from './pages/Login'
import Products from './pages/Products'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Router>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/products' element={<Products />} />
		</Routes>
	</Router>,
)
