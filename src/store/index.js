import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/api'

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

    async loadProductList(context) {
      console.log('loading product list');
      let products = await API.getAllProducts()
      context.commit('setProductList', products)
    },

    async logInUser(context, email, pass) {
      let response = await API.logInUser(email, pass)
      if(response.status == 200){
        sessionStorage.setItem('sinus-token', response.token)
        context.commit('setUser', response.user)
        return response.status
      } else {
        return response.status
      }
    },

    async registerUser(userToRegister) {
      let response = await API.registerUser(userToRegister)
      return response.status
    },

    async getSingleproduct(context, productId) {
      let response = await API.getSingleproduct(productId)
      if (response.status == 200){
        context.commit('setSelectedProduct', response)
      }
      return response.status
    },

    async createProduct(context, product) {
      let token = JSON.parse(sessionStorage.getItem('sinus-token'))
      let response = API.createProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async updateProduct(context, product) {
      let token = JSON.parse(sessionStorage.getItem('sinus-token'))
      let response = API.updateProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async deleteProduct(context, product) {
      let token = JSON.parse(sessionStorage.getItem('sinus-token'))
      let response = API.deleteProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async getAllOrders() {
      let token = JSON.parse(sessionStorage.getItem('sinus-token'))
      let response = await API.getAllOrders(token)
      return response
    },

    async addOrder(context, order) {
      let token = JSON.parse(sessionStorage.getItem('sinus-token'))
      let response = await API.addOrder(token, order)
      return response
    },

  },
  modules: {
  }
})
