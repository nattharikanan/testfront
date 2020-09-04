import axios from "axios";
import OrderProvider from "@/resources/order_provider";

const orderService = new OrderProvider();
// const ConfirmOrder = async payload => {
//   const insertorder = await axios.post(`http://localhost:7000/api/orders`);
//   const getorder = await axios.get(
//     `http://localhost:7000/api/orders/detail?orderid=${payload.orderid}`
//   );
// };

async function input(order) {
  console.log("helllo", order.orderid);
  const res = await axios.post("http://localhost:7000/api/orders", {
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
  //   insertorder,
  //   getorder
};
