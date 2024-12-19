import React from 'react'
import { tProduct } from '../lib/types'
import ProductCard from './ProductCard'

interface ProductListProps {
	products: tProduct[]
	startEditing: (product: tProduct) => void
	deleteProduct: (id: number) => void
}

const ProductList: React.FC<ProductListProps> = ({ products, startEditing, deleteProduct }) => {
	return (
		<div className='flex flex-wrap'>
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					startEditing={startEditing}
					deleteProduct={deleteProduct}
				/>
			))}
		</div>
	)
}

export default ProductList
