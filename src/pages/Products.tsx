import AddProductButton from '@/components/AddProductButton'
import Navbar from '@/components/navbar'
import ProductList from '@/components/ProductList'
import ProductModal from '@/components/ProductModal'
import { tProduct } from '@/lib/types'
import { useEffect, useState } from 'react'

const Products = () => {
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [products, setProducts] = useState<tProduct[]>([])
	const [currentProduct, setCurrentProduct] = useState<tProduct | null>(null)
	const [loading, setLoading] = useState(false)

	const username: string = localStorage.getItem('username') || 'Guest'

	// Product GET
	const fetchProducts = async () => {
		setLoading(true) // Start loading when fetching data
		try {
			const response = await fetch('https://crudproduct.pythonanywhere.com/api/products/')
			if (!response.ok) throw new Error('Network response was not ok')
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setLoading(false) // Stop loading once the request is complete
		}
	}

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

	// Product PUT - Update the product
	const saveEditedProduct = async (updatedProduct: tProduct) => {
		setLoading(true) // Start loading when saving the edited product
		try {
			const response = await fetch(
				`https://crudproduct.pythonanywhere.com/api/products/${updatedProduct.id}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
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

	// Product DELETE
	const deleteProduct = async (id: number) => {
		setLoading(true) // Start loading when deleting the product
		try {
			const response = await fetch(`https://crudproduct.pythonanywhere.com/api/products/${id}/`, {
				method: 'DELETE',
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

	// Show loading state while products are being loaded or during any other async actions
	if (loading) {
		return <div className='flex items-center justify-center h-screen'>Loading...</div>
	}

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
