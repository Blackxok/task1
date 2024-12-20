import { tProduct } from '@/lib/types'
import { getValidAccessToken } from '@/utils/tokenUtils'
import React, { useEffect, useState } from 'react'

interface ProductModalProps {
	isOpen: boolean
	onClose: () => void
	product: tProduct | null
	saveProduct: (product: tProduct) => void
	isEdit: boolean
}

const ProductModal: React.FC<ProductModalProps> = ({
	isOpen,
	onClose,
	product,
	saveProduct,
	isEdit,
}) => {
	const [productData, setProductData] = useState<tProduct>({
		id: 0,
		name: '',
		description: '',
		price: '',
		quantity: '',
		created_at: '',
		updated_at: '',
	})

	useEffect(() => {
		if (isEdit && product) {
			setProductData({
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				quantity: product.quantity,
				created_at: product.created_at,
				updated_at: product.updated_at,
			})
		} else {
			setProductData({
				id: 0,
				name: '',
				description: '',
				price: '',
				quantity: '',
				created_at: '',
				updated_at: '',
			})
		}
	}, [isEdit, product])

	if (!isOpen) return null

	// Handle save button
	const handleSave = async () => {
		if (isEdit) {
			// Update existing product if in edit mode
			saveProduct(productData)
		} else {
			//  POST
			const validAccessToken = await getValidAccessToken()

			if (!validAccessToken) {
				console.error('JWT token mavjud emas yoki yangilashda xatolik yuz berdi!')
				return
			}
			try {
				const response = await fetch('https://crudproduct.pythonanywhere.com/api/products/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${validAccessToken}`, // JWT tokenni Authorization headerda yuborish
					},
					body: JSON.stringify({
						name: productData.name,
						description: productData.description,
						price: productData.price,
						quantity: productData.quantity,
					}),
				})

				if (!response.ok) {
					throw new Error('Failed to add product')
				}

				const newProduct = await response.json()
				saveProduct(newProduct)
				onClose() // Close the modal after adding the product
			} catch (error) {
				console.error('Error adding product:', error)
			}
		}
	}

	return (
		<div className='flex items-center justify-center'>
			<div className='fixed top-16 right-4 w-full max-w-sm p-4 bg-gray-700 text-white shadow-lg rounded-lg'>
				<h3 className='text-lg font-semibold'>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>

				<input
					type='text'
					value={productData.name}
					onChange={e => setProductData({ ...productData, name: e.target.value })}
					placeholder='Product Name'
					className='w-full mt-2 p-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<input
					type='text'
					value={productData.description}
					onChange={e => setProductData({ ...productData, description: e.target.value })}
					placeholder='Product Description'
					className='w-full mt-2 p-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<input
					type='number'
					value={productData.price}
					onChange={e => setProductData({ ...productData, price: e.target.value })}
					placeholder='Product Price'
					className='w-full mt-2 p-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<input
					type='number'
					value={productData.quantity}
					onChange={e => setProductData({ ...productData, quantity: e.target.value })}
					placeholder='Product Quantity'
					className='w-full mt-2 p-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<button
					className='w-full bg-blue-600 hover:bg-blue-700 mt-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					onClick={handleSave}
				>
					{isEdit ? 'Save Changes' : 'Add Product'}
				</button>
			</div>
		</div>
	)
}

export default ProductModal
