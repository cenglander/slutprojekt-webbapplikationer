<template>
  <div class="admin-area-container">
    <Header/>
    <div class="login">
      <p>Login</p>
      <input type="email" v-model="admin.email" placeholder="email" />
      <input type="password" v-model="admin.password" placeholder="password" />
      <button v-on:click="loginAdmin">login</button>
      <p>User: {{loggedIn}}</p>
    </div>
    <div class="create-product">
      <p>Create Product</p>
      <form @submit.prevent="createProduct">
        <input type="text" v-model="product.title" placeholder="title" />
        <input type="number" v-model="product.price" placeholder="price" />
        <input type="text" v-model="product.shortDesc" placeholder="Short description" />
        <textarea type="text" v-model="product.longDesc" placeholder="Long description"></textarea>
        <input type="submit" />
      </form>
    </div>
    <div class="product-list">
      <ul>
        <li v-for="product in getProductList" v-bind:key="product._id">
          <p>{{product.title}} {{product._id}}</p>
          <button @click="toggleUpdate">update</button>
          <button @click="deleteProduct(product)">delete</button>
          <div class="updateProduct" v-if="activateUpdateMode">
            <p>Update Product</p>
            <form @submit.prevent="updateProduct">
              <input type="text" v-model="product.title" placeholder="title" />
              <input type="number" v-model="product.price" placeholder="price" />
              <input type="text" v-model="product.shortDesc" placeholder="Short description" />
              <textarea type="text" v-model="product.longDesc" placeholder="Long description"></textarea>
              <input type="submit" />
            </form>
          </div>
        </li>
      </ul>
    </div>

    <p></p>
  </div>
</template>

<script>
export default {
  name: "AdminArea",
  data() {
    return {
      admin: {
        email: "",
        password: ""
      },
      loggedIn: {
        name: "",
        role: ""
      },
      product: {
        title: "",
        price: 0,
        shortDesc: "",
        longDesc: "",
        imgFile: "skateboard-generic.png"
      },
      activateUpdateMode: false
    };
  },
  computed: {
    getProductList() {
      return this.$store.state.productList;
    }
  },
  methods: {
    loginAdmin() {
      this.$store.dispatch("logInUser", this.admin);
    },
    createProduct() {
      this.$store.dispatch("createProduct", this.product);
    },
    updateProduct(product) {
      this.$store.dispatch("updateProduct", product);
    },
    deleteProduct(product) {
      this.$store.dispatch("deleteProduct", product);
    },
    toggleUpdate() {
      this.activateUpdateMode = !this.activateUpdateMode;
    }
  }
};
</script>

<style scoped>
.login {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-product {
  border: 1px solid black;
}
.create-product form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-list {
  border: 1px solid black;
}
img {
  width: 10%;
}
</style>