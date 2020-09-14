import axios from "axios";
import OrderProvider from "@/resources/order_provider";

const orderService = new OrderProvider();

async function input(order) {
  console.log("helllo", order.orderid);
  const res = await axios.post(`${process.env.NUXT_ENV_API}/api/orders`, {
    userid: order.userid,
    orderdate: order.orderdate,
    ordertime: order.ordertime,
    tracking: order.tracking,
    shipMedthod: order.shipMedthod
  });
  console.log("helllo", res.data);
  return res.data;
}

export default {
  ConfirmOrder
};
