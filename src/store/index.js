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
    productsInCart: [
        // {
        //   amount: Number,
        //   product: {}
        // }
    ],
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
  getters: {
    getAmountInCart: state => {
      return state.productsInCart.map(item => item.amount).reduce((a, b) => a + b, 0)
    }
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
      state.currentUser = payload
    },
    setOrder(state, payload) {
      console.log('setting order...');
      state.order = payload
    },
    addProductToCart(state, productToAdd) {
      console.log('mutation-adding prod to cart');
      let productExists = false
      for (let cartItem of state.productsInCart) {
        if (cartItem.product._id === productToAdd._id) {
          cartItem.amount++
          productExists = true
        }
      }
      if (!productExists) {
        console.log("in product doesnt exist");
        let newProduct = {}
        newProduct.product = productToAdd
        newProduct.amount = 1
        state.productsInCart.push(newProduct)
      }
    },
    removeProductFromCart(state, productToRemove) {
      console.log('mutation-removing prod from cart');
      let index = state.productsInCart.findIndex(item => item.product._id === productToRemove._id)
      for (let cartItem of state.productsInCart) {
        if (cartItem.product._id === productToRemove._id) {
          if (cartItem.amount > 1) {
            cartItem.amount--
          } else {
            state.productsInCart.splice(index, 1)
          }
        }
      }
    },
    setSelectedProduct(state, payload) {
      console.log('setting selcted product');
      state.selectedProduct = payload
    },
    changeCartVisibility(state, payload) {
      console.log('mutation - changing cart visibility')
      state.showCart = payload
    },
  },
  actions: {

    async loadProductList(context) {
      console.log('loading product list');
      let products = await API.getAllProducts()
      context.commit('setProductList', products)
    },

    async logInUser(context, payload) {
      console.log('in logInUser action');
      
      let response = await API.logInUser(payload.email, payload.pass)
      if(response.status == 200){
        sessionStorage.setItem('sinus-token', response.token)
        context.commit('setUser', response.user)
        return response.status
      } else {
        return response.status
      }
    },

    async registerUser(_, userToRegister) {
      console.log('in register user in actions');
      let response = await API.registerUser(userToRegister)
      return response.status
    },

    async getSingleproduct(context, productId) {
      console.log('in getSingleProduct in actions');
      
      let response = await API.getSingleproduct(productId)
      if (response.status == 200){
        context.commit('setSelectedProduct', response)
      }
      return response.status
    },

    async createProduct(context, product) {
      console.log('in createProduct in actions');
      let token = sessionStorage.getItem('sinus-token')
      let response = API.createProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async updateProduct(context, product) {
      console.log('in updateProduct in actions');
      let token = sessionStorage.getItem('sinus-token')
      let response = API.updateProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async deleteProduct(context, product) {
      console.log('in deleteProduct in actions');
      let token = sessionStorage.getItem('sinus-token')
      let response = API.deleteProduct(token, product)
      if (response.status == 200) {
        context.dispatch('loadProductList')
      }
      return response
    },

    async getAllOrders() {
      console.log('in getAllOrders in actions');
      let token = sessionStorage.getItem('sinus-token')
      let response = await API.getAllOrders(token)
      return response
    },

    async addOrder(context, order) {
      console.log('in addOrder in actions');
      
      let token = sessionStorage.getItem('sinus-token')
      let response = await API.addOrder(token, order)
      return response
    },

  },
  modules: {
  }
})
