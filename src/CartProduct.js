import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CartProduct = (props) => {
	const [prod, setProd] = useState('')
	const remove = async () => {
		try {
			console.log(props.product, prod)
			let response = await axios.delete(`/api/cart/${props.product.id}`)
			props.refresh()
		} catch (error) {
			console.log(error)
		}
	}
	const add = async () => {
		try {
			console.log(props.product, prod)
			let response = await axios.put(
				`/api/cart/${props.product.id}/${parseInt(props.product.quantity) + 1}`
			)
			props.refresh()
		} catch (error) {
			console.log(error)
		}
	}
	const subtract = async () => {
		try {
			console.log(props.product, prod)
			let response = await axios.put(
				`/api/cart/${props.product.id}/${parseInt(props.product.quantity) - 1}`
			)
			props.refresh()
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const getProduct = async (prod) => {
			try {
				let response = await axios.get(`/api/products/${props.product.id}`)
				console.log(response.data)
				setProd(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getProduct()
	}, [props])
	if (prod != '') {
		return (
			<div>
				<p>
					{`${prod.name}, ${props.product.quantity}`}
					&nbsp;&nbsp;<button onClick={() => subtract()}>-</button>&nbsp;&nbsp;
					<button onClick={() => add()}>+</button>
					&nbsp;&nbsp;
					<button onClick={() => remove()}>Remove</button>
				</p>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default CartProduct
