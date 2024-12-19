import React from 'react'
import { Button } from '../components/ui/button'
import { tProduct } from '../lib/types'

interface ProductCardProps {
	product: tProduct
	startEditing: (product: tProduct) => void
	deleteProduct: (id: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, startEditing, deleteProduct }) => {
	return (
		<div className='sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2'>
			<div className='bg-gray-800 p-4 rounded-lg flex flex-col'>
				<h3 className='text-lg text-center font-semibold mt-2 text-white'>{product.name}</h3>
				<p className='mt-2 text-sm text-gray-400'>{product.description}</p>
				<p className='mt-2 text-sm text-gray-200'>Price: ${product.price}</p>
				<p className='mt-2 text-sm text-gray-200'>Quantity: {product.quantity}</p>
				<p className='mt-2 text-xs text-gray-500'>
					Created at: {new Date(product.created_at).toLocaleDateString()}
				</p>
				<p className='mt-1 text-xs text-gray-500'>
					Updated at: {new Date(product.updated_at).toLocaleDateString()}
				</p>
				<div className='mt-4 flex justify-between w-full gap-2'>
					<Button className='w-1/3' onClick={() => startEditing(product)}>
						Edit
					</Button>
					<Button className='w-1/3' onClick={() => deleteProduct(product.id)}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
