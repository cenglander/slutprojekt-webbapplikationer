<template>
  <div class="admin-area-container">
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
        <input type="file" id="img" name="img" accept="image/*" />
        <input type="submit" />
      </form>
    </div>
    <div class="product-list" v-for="product in getProductList" v-bind:key="product._id">
      <p>{{product}}</p>
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
        imgFile: ""
      }
    };
  },
  computed: {
    getProductList() {
        return this.$store.state.productList;
    }
  },
  methods: {
    loginAdmin() {
      this.$store.commit("setUser", this.admin);
    },
    createProduct() {
      this.$store.context("createProduct", this.product);
    },
    updateProduct() {
        this.$store.context("updateProduct", this.product);
    },
    deleteProduct() {
        this.$store.context("deleteProduct", this.product);
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
</style>