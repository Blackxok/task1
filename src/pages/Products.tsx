import Navbar from '@/components/navbar'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Products = () => {
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [username] = useState('Admin')
	const [products, setProducts] = useState([
		{ id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150' },
		{ id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150' },
		{ id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150' },
		{ id: 4, name: 'Product 4', image: 'https://via.placeholder.com/150' },
		{ id: 5, name: 'Product 5', image: 'https://via.placeholder.com/150' },
		{ id: 6, name: 'Product 6', image: 'https://via.placeholder.com/150' },
		{ id: 7, name: 'Product 7', image: 'https://via.placeholder.com/150' },
		{ id: 8, name: 'Product 8', image: 'https://via.placeholder.com/150' },
		{ id: 9, name: 'Product 9', image: 'https://via.placeholder.com/150' },
		{ id: 10, name: 'Product 10', image: 'https://via.placeholder.com/150' },
		{ id: 11, name: 'Product 11', image: 'https://via.placeholder.com/150' },
		{ id: 12, name: 'Product 12', image: 'https://via.placeholder.com/150' },
		{ id: 13, name: 'Product 13', image: 'https://via.placeholder.com/150' },
		{ id: 14, name: 'Product 14', image: 'https://via.placeholder.com/150' },
		{ id: 15, name: 'Product 15', image: 'https://via.placeholder.com/150' },

		// Add more products as needed...
	])
	const [newProductName, setNewProductName] = useState('')
	const [newProductImage, setNewProductImage] = useState('')
	const [editingProductId, setEditingProductId] = useState<number | null>(null)
	const [editedProductName, setEditedProductName] = useState('')
	const [editedProductImage, setEditedProductImage] = useState('')

	// Refs for Add and Edit divs
	const addProductRef = useRef<HTMLDivElement | null>(null)
	const editProductRef = useRef<HTMLDivElement | null>(null)

	// Close modals if clicked outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (addProductRef.current && !addProductRef.current.contains(e.target as Node) && isAddOpen) {
				setIsAddOpen(false)
			}
			if (
				editProductRef.current &&
				!editProductRef.current.contains(e.target as Node) &&
				isEditOpen
			) {
				setIsEditOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isAddOpen, isEditOpen])

	const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
		if (e.key === 'Enter') action()
	}

	const addProduct = () => {
		if (products.length > 0 && (!newProductName || !newProductImage)) {
			alert('Product name and image are required')
			return
		}
		setProducts([
			...products,
			{ id: products.length + 1, name: newProductName, image: newProductImage },
		])
		setNewProductName('')
		setNewProductImage('')
		setIsAddOpen(false)
	}

	const startEditing = (product: { id: number; name: string; image: string }) => {
		setEditingProductId(product.id)
		setEditedProductName(product.name)
		setEditedProductImage(product.image)
		setIsEditOpen(true)
	}

	const saveEditedProduct = () => {
		if (products.length > 0 && (!editedProductName || !editedProductImage)) {
			alert('Edited product name and image are required')
			return
		}
		setProducts(
			products.map(product =>
				product.id === editingProductId
					? { ...product, name: editedProductName, image: editedProductImage }
					: product,
			),
		)
		setEditingProductId(null)
		setIsEditOpen(false)
	}

	const deleteProduct = (id: number) => {
		setProducts(products.filter(product => product.id !== id))
	}

	return (
		<div className='w-full h-screen bg-gray-900 text-gray-100 overflow-y-scroll'>
			<Navbar username={username} />
			{/* Add Product Button */}
			<Button
				className='items-center mx-auto mt-4 bg-blue-500 hover:bg-blue-800 py-2 px-4 rounded-none'
				onClick={() => setIsAddOpen(true)}
			>
				<Plus size={24} />
				<span className='ml-2'>Add Product</span>
			</Button>

			{/* Add Product Modal */}
			{isAddOpen && (
				<div
					ref={addProductRef}
					className='fixed top-16 right-4 w-80 p-4 bg-gray-700 text-white rounded-lg shadow-lg'
				>
					<h3 className='text-lg font-semibold'>Add New Product</h3>
					<Input
						type='text'
						value={newProductName}
						onChange={e => setNewProductName(e.target.value)}
						onKeyDown={e => handleKeyDown(e, addProduct)}
						placeholder='Product Name'
						className='w-full mt-2 p-2 bg-gray-700 rounded'
					/>
					<Input
						type='text'
						value={newProductImage}
						onChange={e => setNewProductImage(e.target.value)}
						onKeyDown={e => handleKeyDown(e, addProduct)}
						placeholder='Product Image URL'
						className='w-full mt-2 p-2 bg-gray-700 rounded'
					/>
					<Button
						className='w-full bg-green-600 hover:bg-green-700 mt-3 py-2 rounded'
						onClick={addProduct}
					>
						Add Product
					</Button>
				</div>
			)}

			{/* Product List */}
			<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
				{products.map(product => (
					<div key={product.id} className='bg-gray-800 p-4 rounded shadow'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-2 text-center'>{product.name}</h3>
						<div className='flex justify-between mt-2'>
							<Button
								className='bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded'
								onClick={() => startEditing(product)}
							>
								Edit
							</Button>
							<Button
								className='bg-red-500 hover:bg-red-600 px-2 py-1 rounded'
								onClick={() => deleteProduct(product.id)}
							>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>

			{/* Edit Product Modal */}
			{isEditOpen && (
				<div
					ref={editProductRef}
					className='fixed top-16 right-4 w-80 p-4 bg-gray-700 rounded-lg shadow-lg'
				>
					<h3 className='text-lg font-semibold'>Edit Product</h3>
					<Input
						type='text'
						value={editedProductName}
						onChange={e => setEditedProductName(e.target.value)}
						onKeyDown={e => handleKeyDown(e, saveEditedProduct)}
						placeholder='New Product Name'
						className='w-full mt-2 p-2 bg-gray-700 rounded'
					/>
					<Input
						type='text'
						value={editedProductImage}
						onChange={e => setEditedProductImage(e.target.value)}
						onKeyDown={e => handleKeyDown(e, saveEditedProduct)}
						placeholder='New Product Image URL'
						className='w-full mt-2 p-2 bg-gray-700 rounded'
					/>
					<Button
						className='w-full bg-blue-600 hover:bg-blue-700 mt-3 py-2 rounded'
						onClick={saveEditedProduct}
					>
						Save Changes
					</Button>
				</div>
			)}
		</div>
	)
}

export default Products
