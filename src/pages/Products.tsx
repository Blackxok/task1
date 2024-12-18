import Navbar from '@/components/navbar'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Products = () => {
	const [isAdd, setIsAdd] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
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
		{ id: 16, name: 'Product 16', image: 'https://via.placeholder.com/150' },
		{ id: 17, name: 'Product 17', image: 'https://via.placeholder.com/150' },
		{ id: 18, name: 'Product 18', image: 'https://via.placeholder.com/150' },
	])
	const [newProductName, setNewProductName] = useState('')
	const [newProductImage, setNewProductImage] = useState('')
	const [editingProductId, setEditingProductId] = useState<number | null>(null)
	const [editedProductName, setEditedProductName] = useState('')
	const [editedProductImage, setEditedProductImage] = useState('')

	// Ref for the Add Product div
	const addProductRef = useRef<HTMLDivElement | null>(null)

	// Close Add Product if clicked outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (addProductRef.current && !addProductRef.current.contains(e.target as Node)) {
				setIsAdd(false)
				setIsEdit(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	//  Close Add Product if clicked
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			addProduct()
		}
	}
	const handleKeyDownEdit = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			saveEditedProduct()
		}
	}

	const addProduct = () => {
		if (!newProductName || !newProductImage) {
			alert('Product name and image is required')
		} else {
			setProducts([
				...products,
				{ id: products.length + 1, name: newProductName, image: newProductImage },
			])

			setNewProductName('')
			setNewProductImage('')
			setIsAdd(false) // Close the add product div after adding the product
		}
	}

	const deleteProduct = (id: number) => {
		setProducts(products.filter(product => product.id !== id))
	}

	const startEditing = (product: { id: number; name: string; image: string }) => {
		setEditingProductId(product.id)
		setEditedProductName(product.name)
		setEditedProductImage(product.image)
		setIsEdit(true) // Show the edit product div when editing a product
	}

	const saveEditedProduct = () => {
		if (!editedProductName || !editedProductImage) {
			alert('Changing wrong edited product name or product image')
			return // Stop if product name or image is not provided
		} else {
			setProducts(
				products.map(product =>
					product.id === editingProductId
						? { ...product, name: editedProductName, image: editedProductImage }
						: product,
				),
			)
			setEditingProductId(null)
			setEditedProductName('')
			setEditedProductImage('')
		}
	}

	return (
		<div className='w-full h-screen overflow-y-scroll bg-gray-200 '>
			{/* Navbar */}
			<Navbar username={username} />
			{/* Add Product */}
			<button
				className='flex items-center rounded-none hover:border-transparent'
				onClick={() => setIsAdd(true)}
			>
				<Plus size={24} />
				<span>Add Product</span>
			</button>

			{isAdd && (
				<div
					ref={addProductRef} // Attach the ref to the Add Product div
					className='fixed right-0 top-14 w-1/4 p-6 text-gray-100 bg-black shadow-md transform transition-transform duration-300 ease-in-out'
					style={{ transform: isAdd ? 'translateX(-16px)' : 'translateX(100%)' }}
				>
					<h3 className='text-xl font-semibold text-center'>Add New Product</h3>
					<div className='space-y-2'>
						<Input
							type='text'
							value={newProductName}
							onChange={e => setNewProductName(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='Enter product name'
							className='w-full p-2 border border-gray-500 rounded-lg'
						/>
						<Input
							type='text'
							value={newProductImage}
							onChange={e => setNewProductImage(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='Enter product image URL'
							className='w-full p-2 border border-gray-500 rounded-lg'
						/>
						<Button
							onClick={addProduct}
							className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
						>
							Add Product
						</Button>
					</div>
				</div>
			)}

			{/* Product List */}
			<div className='text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 py-5 px-10'>
				{products.map(product => (
					<div key={product.id} className=' p-4 rounded-lg shadow-md flex flex-col items-center'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-32 object-cover mb-4 rounded-md'
						/>
						<h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
						<div className='flex space-x-4'>
							<Button
								onClick={() => startEditing(product)}
								className='bg-yellow-300 hover:bg-yellow-500 py-2 px-4 rounded'
							>
								Edit
							</Button>
							<Button
								onClick={() => deleteProduct(product.id)}
								className='bg-red-500 hover:bg-red-600  py-2 px-4 rounded'
							>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>

			{/* Edit Product */}
			{editingProductId && (
				<div
					ref={addProductRef} // Attach the ref to the Add Product div
					className='fixed right-0 top-14 w-1/4 p-6 text-gray-100 bg-black shadow-md transform transition-transform duration-300 ease-in-out'
					style={{ transform: isEdit ? 'translateX(-16px)' : 'translateX(100%)' }}
				>
					<h3 className='text-xl font-semibold mb-4'>Edit Product</h3>
					<div className='space-y-4'>
						<Input
							type='text'
							value={editedProductName}
							onChange={e => setEditedProductName(e.target.value)}
							onKeyDown={handleKeyDownEdit}
							placeholder='Enter new product name'
							className='w-full p-2 border border-gray-300 rounded-lg'
						/>
						<Input
							type='text'
							value={editedProductImage}
							onChange={e => setEditedProductImage(e.target.value)}
							onKeyDown={handleKeyDownEdit}
							placeholder='Enter new product image URL'
							className='w-full p-2 border border-gray-300 rounded-lg'
						/>
						<div className='flex space-x-4'>
							<Button
								onClick={saveEditedProduct}
								className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
							>
								Save Changes
							</Button>
							<Button
								onClick={() => setEditingProductId(null)}
								className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded'
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Products
