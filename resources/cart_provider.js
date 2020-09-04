import HttpRequest from './http_request'

class CartProvider extends HttpRequest {
    
    async getCartLength(payload) {
        return await this.fetch(`/carts/cartlength?userid=${payload}`)
    }

    async getCartById(payload) {
        return await this.fetch(`/carts/detail?userid=${payload}`)
    }
}

export default CartProvider
