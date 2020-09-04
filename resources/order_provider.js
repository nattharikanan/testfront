import HttpRequest from "./http_request";

class OrderProvider extends HttpRequest {
  async getOrder(payload) {
    return await this.fetch(`/orders/detail?orderid=${payload}`);
  }
}

export default OrderProvider;
