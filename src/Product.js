import axios from 'axios'
import React from 'react'

const Product = (props) => {
	const add = async (prod) => {
		try {
			let response = await axios.post(`/api/cart/${prod.id}`)
			props.refresh()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<p>
				{`${props.product.name}, ${props.product.price}`}
				&nbsp;&nbsp;
				<button onClick={() => add(props.product)}>Add to cart</button>
			</p>
		</div>
	)
}

export default Product
