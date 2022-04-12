const config = {
	apiUrl: 'http://us-central1-test-b7665.cloudfunctions.net/api',
	storeId: 'ijpxNJLM732vm8AeajMR',
}

const loadStore = async () => {
	try{
		const response = await fetch(`${config.apiUrl}/stores/${config.storeId}`, {
			method: 'GET',
		})
		return await response.json()
	}
	catch(error){
		console.error(error)
		return null
	}
}

const loadProducts = async () => {
	try{
		const response = await fetch(`${config.apiUrl}/stores/${config.storeId}/products`, {
			method: 'GET',
		})
		const items = await response.json()
		return items.map(item => { return { ...item.data, id: item.id } })
	}
	catch(error){
		console.error(error)
		return []
	}
}

const createProduct = async (product) => {
	try{
		const response = await fetch(`${config.apiUrl}/stores/${config.storeId}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product),
		})
		return true
	}
	catch(error){
		console.error(error)
		return false
	}
}

const deleteProduct = async (productId) => {
	try{
		const response = await fetch(`${config.apiUrl}/stores/${config.storeId}/products/${productId}`, {
			method: 'DELETE',
		})
		return true
	}
	catch(error){
		console.error(error)
		return false
	}
}

export default {
	loadStore,
	loadProducts,
	createProduct,
	deleteProduct,
}