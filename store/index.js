import axios from "axios";
export const getDefaultState = () => ({
  productg: [],
  cartdb: [],
  cartinput: [],
  length: "",
  cartLength: 0,
  carts: [],
  myorder: 0
});

export const state = () => ({
  productg: [],
  cartdb: [],
  cartinput: [],
  length: "",
  cartLength: 0,
  carts: [],
  q_productid: "",
  q_productname: ""
});

export const getters = {
  cartItemCount: state => {
    return state.testlength;
  },
  cartTotalPrice: state => {
    let total = 0;
    state.cart.forEach(item => {
      total += item.product.unitprice * item.quantity;
    });
    return total;
  },
  CartLength: state => {
    return state.cartLength;
  },
  Carts: state => {
    return state.carts;
  },
  Ordernum: state => {
    return state.myorder;
  },
  Qproductid: state => {
    return q_productid;
  }
};
export const mutations = {
  GET_PID_EDIT(state, pid) {
    state.idedit = pid;
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_CART_LENGTH: (state, payload) => {
    state.cartLength = payload;
  },
  SET_CART: (state, length) => {
    state.length = length;
    console.log("length", state.length);
  },
  SET_PRODUCT: (state, productg) => {
    state.productg = productg;
  },
  SET_CART_TEMP: (state, payload) => {
    state.carts = payload;
  },
  SET_MY_ORDER: (state, payload) => {
    state.myorder = payload;
  },
  SET_MY_Pid: (state, payload) => {
    state.q_productid = payload;
  }
};

export const actions = {
  resetState({ commit }) {
    console.log("actionssss");
    commit("RESET_STATE");
  },
  async mylength({ commit }) {
    let uid = $nuxt.$auth.user[0].userid;
    const test = await axios.get(
      `http://localhost:7000/api/carts/cartlength?userid=${uid}`
    );
    let temp = test.data.carts[0].length;
    console.log("my", temp);
    commit("SET_CART", temp);
  },
  async getProduct({ commit }, pid) {
    const res = await this.$axios.get(
      `http://localhost:7000/api/product?productid=${pid}`
    );
    console.log("products detail respon", res.data);
    commit("SET_PRODUCT", res.data);
  },
  setCartLength({ commit }, payload) {
    commit("SET_CART_LENGTH", payload);
  },
  setCartTemp({ commit }, payload) {
    commit("SET_CART_TEMP", payload);
  },
  getMyorder({ commit }, payload) {
    commit("SET_MY_ORDER", payload);
  },
  setMyProductId({ commit }, payload) {
    commit("SET_MY_Pid", payload);
  }
};

//   // let uid = $nuxt.$auth.user[0].userid
//   // const test = await axios.get(`http://localhost:7000/api/carts/cartlength?userid=${uid}`);
//   // state.testlength = test.data.carts[0].length
//   console.log("myl", state.testlength)
//   return state.testlength

// }
