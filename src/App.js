import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Product from './Product.js'
import Error from './Error'
import CartProduct from './CartProduct'

function App() {
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])

	const [error, setError] = useState({ error: false, msg: '' })

	useEffect(() => {
		const getProducts = async () => {
			try {
				let response = await axios.get('/api/products')
				setProducts(response.data)
			} catch (error) {
				console.log(error)
				setError({ error: true, msg: error })
			}
		}
		const getCart = async () => {
			try {
				let response = await axios.get('/api/cart')
				setCart(response.data)
			} catch (error) {
				console.log(error)
				setError({ error: true, msg: error })
			}
		}
		getProducts()
		getCart()
	}, [])

	const refreshCart = async () => {
		try {
			let response = await axios.get('/api/cart')
			setCart(response.data)
		} catch (error) {
			console.log(error)
			setError({ error: true, msg: error })
		}
	}
	if (products.length > 0 && !error.error) {
		return (
			<div className='change'>
				<div>
					<h1>Products</h1>
					{products.map((product, index) => {
						return (
							<Product
								refresh={refreshCart}
								key={index}
								product={product}></Product>
						)
					})}
				</div>
				<div>
					<h1>Cart</h1>
					{cart.map((product, index) => {
						return (
							<CartProduct
								refresh={refreshCart}
								key={index}
								product={product}></CartProduct>
						)
					})}
				</div>
			</div>
		)
	} else if (error.error) {
		return (
			<div>
				<Error error={error.msg}></Error>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default App
