import AddProductButton from '@/components/AddProductButton'
import ProductList from '@/components/ProductList'
import ProductModal from '@/components/ProductModal'
import Navbar from '@/components/navbar'
import { tProduct } from '@/lib/types'
import { getValidAccessToken } from '@/utils/tokenUtils'
import { useEffect, useState } from 'react'

const Products = () => {
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [products, setProducts] = useState<tProduct[]>([])
	const [currentProduct, setCurrentProduct] = useState<tProduct | null>(null)
	const [loading, setLoading] = useState(false)

	const username: string = localStorage.getItem('username') || 'Guest'

	useEffect(() => {
		fetchProducts()
	}, [])

	const addProduct = (newProduct: tProduct) => {
		setProducts(prevProducts => [...prevProducts, newProduct])
		setIsAddOpen(false)
	}

	const startEditing = (product: tProduct) => {
		setCurrentProduct(product)
		setIsEditOpen(true)
	}

	//  GET
	const fetchProducts = async () => {
		setLoading(true)
		try {
			// Get a valid access token
			const validAccessToken = await getValidAccessToken()
			if (!validAccessToken) {
				console.error('JWT token mavjud emas yoki yangilashda xatolik yuz berdi!')
				setLoading(false)
				return
			}
			// Fetch so'rovini yuborish
			const response = await fetch('https://crudproduct.pythonanywhere.com/api/products/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${validAccessToken}`,
				},
			})
			// Javobni tekshirish
			if (!response.ok) throw new Error('Network response was not ok')

			const data = await response.json()
			setProducts(data)
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error:', error.message)
			} else {
				console.error('Unexpected error:', error)
			}
		} finally {
			setLoading(false)
		}
	}
	//  PUT
	const saveEditedProduct = async (updatedProduct: tProduct) => {
		setLoading(true) // Start loading when saving the edited product
		try {
			// Get a valid access token
			const validAccessToken = await getValidAccessToken()
			if (!validAccessToken) {
				console.error('JWT token mavjud emas yoki yangilashda xatolik yuz berdi!')
				setLoading(false)
				return
			}
			const response = await fetch(
				`https://crudproduct.pythonanywhere.com/api/products/${updatedProduct.id}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${validAccessToken}`,
					},
					body: JSON.stringify(updatedProduct),
				},
			)

			if (!response.ok) {
				throw new Error('Failed to update the product')
			}

			const updatedData = await response.json()
			setProducts(
				products.map(product => (product.id === updatedProduct.id ? updatedData : product)),
			)
			setIsEditOpen(false)
		} catch (error) {
			console.error('Error updating product:', error)
		} finally {
			setLoading(false) // Stop loading once the request is complete
		}
	}

	//  DELETE
	const deleteProduct = async (id: number) => {
		setLoading(true) // Start loading when deleting the product
		try {
			// Get a valid access token
			const validAccessToken = await getValidAccessToken()
			if (!validAccessToken) {
				console.error('JWT token mavjud emas yoki yangilashda xatolik yuz berdi!')
				setLoading(false)
				return
			}

			const response = await fetch(`https://crudproduct.pythonanywhere.com/api/products/${id}/`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to delete the product')
			}

			setProducts(products.filter(product => product.id !== id))
		} catch (error) {
			console.error('Error deleting product:', error)
		} finally {
			setLoading(false) // Stop loading once the request is complete
		}
	}

	// if (loading) {
	// 	return <div className='flex items-center justify-center h-screen'>Loading...</div>
	// }

	return (
		<div className='w-full flex flex-col h-screen overflow-y-scroll'>
			<Navbar username={username} />
			<div className='max-w-7xl mx-auto w-full'>
				<div className='w-full'>
					<AddProductButton onClick={() => setIsAddOpen(true)} />
				</div>
				<div className='container'>
					<ProductList
						products={products}
						startEditing={startEditing}
						deleteProduct={deleteProduct}
					/>
				</div>

				{/* Product Modal for Adding */}
				<ProductModal
					isOpen={isAddOpen}
					onClose={() => setIsAddOpen(false)}
					product={null}
					saveProduct={addProduct}
					isEdit={false}
				/>

				{/* Product Modal for Editing */}
				<ProductModal
					isOpen={isEditOpen}
					onClose={() => setIsEditOpen(false)}
					product={currentProduct}
					saveProduct={saveEditedProduct}
					isEdit={true}
				/>
			</div>
		</div>
	)
}

export default Products
