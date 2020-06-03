import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/assets/js/API.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    productList: [],
    currentUser: null, // add role to current user for admin/customer
    //   {
    //     _id: '6b521d3f-3d15...' // add server side
    //     email: 'johan.kivi@zocom.se',
    //     password: '$$$hashed password$$$',
    //     name: 'Johan Kivi',
    //     role: 'admin', // or customer
    
    //     adress: {
    //         street: 'Tokitokvägen 3',
    //         zip: '123 45',
    //         city: 'Tokberga'
    //     },
    //     orderHistory: [ orderId1, orderId2, ... ]
    // } 
    productsInCart: [],
    order: {
        // _id: 123,
        // timeStamp: Date.now(), 
        // status: 'inProcess',
        // items: [ <productId1>, <productId2>, ... ],
        // orderValue: 999
    },
    showCart: false,
    showLogIn: false,
    showProduct: false,
    selectedProduct: null,
  },
  mutations: {
    setProductList(state, payload) {
      state.productList = payload
    },
    setProductsInCart(state, payload) {
      console.log('setting order list');
      state.productsInCart = payload
    },
    setUser(state, payload) {
      console.log('setting user');
      state.user = payload
    },
    setOrder(state, payload) {
      console.log('setting order...');
      state.order = payload
    },
    addProductToCart(state, payload) {
      console.log('adding prod to cart');
      state.productsInCart.push(payload)
    },
    removeProductFromCart() {
      console.log('removing prod from cart');
    },
    setSelectedProduct(state, payload) {
      console.log('setting selcted product');
      state.selectedProduct = payload
    }
  },
  actions: {
    loadProductList(context) {
      console.log('loading product list');
      context.commit('setProductList', API.getAllProducts())
    },
  },
  modules: {
  }
})
