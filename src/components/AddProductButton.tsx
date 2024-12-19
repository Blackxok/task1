import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'

interface AddProductButtonProps {
	onClick: () => void
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ onClick }) => {
	return (
		<Button
			className='items-center mx-auto mt-4 bg-blue-500 hover:bg-blue-800 py-2 px-4 rounded-none'
			onClick={onClick}
		>
			<Plus className='mr-2' /> Add Product
		</Button>
	)
}

export default AddProductButton
