import axios from "axios";
import CartProvider from "@/resources/cart_provider";

const cartService = new CartProvider();
const addToCart = async payload => {
  const res = await axios.get(
    `${process.env.NUXT_ENV_API}/api/product?productid=${payload.id}`
  );
  const allcarts = await axios.get(
    `${process.env.NUXT_ENV_API}/api/carts/detail?userid=${payload.uid}`
  );

  const userres = await axios.get(
    `${process.env.NUXT_ENV_API}/api/users?userid=${payload.uid}`
  );

  const data = {
    quantity: payload.quantity,
    product: res.data.products[0],
    allcarts: allcarts.data.carts,
    uid: userres.data.users[0].userid
  };
  let productInCart = data.allcarts.find(item => {
    return item.productid === data.product.productid;
  });
  if (productInCart) {
    let quantity = (productInCart.quantity += data.quantity);
    console.log("update");
    return await update({
      product_id: data.product.productid,
      pname: data.product.productname,
      price: data.product.unitprice,
      quantity: quantity,
      uid: data.uid
    });
  } else {
    console.log("insert");
    return await input({
      product_id: data.product.productid,
      pname: data.product.productname,
      price: data.product.unitprice,
      quantity: data.quantity,
      uid: data.uid
    });
  }
};

const getCartById = async uid => {
  return await cartService.getCartById(uid);
};

const getCartLength = async uid => {
  let res = await cartService.getCartById(uid);
  console.log("length", res);
  return res.carts.length;
};

async function update(product) {
  console.log("helllo", product.quantity);
  const res = await axios.post(`${process.env.NUXT_ENV_API}/api/carts/update`, {
    productid: product.product_id,
    quantity: product.quantity,
    userid: product.uid
  });
  console.log("helllo", res.data);
  return res.data;
}

async function input(product) {
  console.log("helllo", product.product_id);
  const res = await axios.post(`${process.env.NUXT_ENV_API}/api/carts`, {
    productid: product.product_id,
    pname: product.pname,
    price: product.price,
    quantity: product.quantity,
    userid: product.uid
  });
  console.log("helllo", res.data);
  return res.data;
}

export default {
  addToCart,
  getCartById,
  getCartLength
};
