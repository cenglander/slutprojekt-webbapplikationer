<template>
  <div class="admin-area-container">
<<<<<<< HEAD
    <Header/>
    <div class="login">
=======
    <Header />
    <!-- <div class="login">
>>>>>>> 8bb4fc1eb40382c85e0376202cde02b4c20cace5
      <p>Login</p>
      <input type="email" v-model="admin.email" placeholder="email" />
      <input type="password" v-model="admin.password" placeholder="password" />
      <button v-on:click="loginAdmin">login</button>
      <p>User: {{loggedIn}}</p>
    </div>-->
    <div class="user-container" v-if="getCurrentUser != null">
      <p>User: {{getCurrentUser.name}}</p>
      <p>Role: {{getCurrentUser.role}}</p>
    </div>
    <div class="create-product">
      <p>Create Product</p>
      <input type="text" v-model="product.title" placeholder="title" />
      <input type="number" v-model="product.price" placeholder="price" />
      <input type="text" v-model="product.shortDesc" placeholder="Short description" />
      <textarea type="text" v-model="product.longDesc" placeholder="Long description"></textarea>
      <select v-on:change="showImgCreate" v-model="product.imgFile">
        <option value="hoodie-ash.png">hoodie-ash.png</option>
        <option value="hoodie-fire.png">hoodie-fire.png</option>
        <option value="hoodie-ocean.png">hoodie-ocean.png</option>
        <option value="skateboard-generic.png">skateboard-generic.png</option>
        <option value="skateboard-greta.png">skateboard-greta.png</option>
        <option value="wheel-rocket.png">wheel-rocket.png</option>
        <option value="wheel-spinner.png">wheel-spinner.png</option>
        <option value="wheel-wave.png">wheel-wave.png</option>
      </select>
      <img v-if="displayImgCreate" v-bind:src="require('@/assets/img/' + product.imgFile)" />
      <button @click="createProduct">Create</button>
    </div>
    <div class="updateProduct" v-if="activateUpdateMode">
      <p>Update Product</p>
      <input type="text" v-model="updateProductForm.title" placeholder="title" />
      <input type="number" v-model="updateProductForm.price" placeholder="price" />
      <input type="text" v-model="updateProductForm.shortDesc" placeholder="Short description" />
      <textarea type="text" v-model="updateProductForm.longDesc" placeholder="Long description"></textarea>
      <select v-model="updateProductForm.imgFile">
        <option value="hoodie-ash.png">hoodie-ash.png</option>
        <option value="hoodie-fire.png">hoodie-fire.png</option>
        <option value="hoodie-ocean.png">hoodie-ocean.png</option>
        <option value="skateboard-generic.png">skateboard-generic.png</option>
        <option value="skateboard-greta.png">skateboard-greta.png</option>
        <option value="wheel-rocket.png">wheel-rocket.png</option>
        <option value="wheel-spinner.png">wheel-spinner.png</option>
        <option value="wheel-wave.png">wheel-wave.png</option>
      </select>
      <img v-if="displayImgUpdate" v-bind:src="require('@/assets/img/' + updateProductForm.imgFile)" />
      <button @click="updateProduct">send update</button>
    </div>
    <div class="product-container">
      <article class="product" v-for="product in getProductList" v-bind:key="product._id">
        <p>{{product.title}} {{product._id}}</p>
        <img v-bind:src="require('@/assets/img/' + product.imgFile)" />
        <button @click="toggleUpdateMode(product)">update product</button>
        <button @click="deleteProduct(product)">delete</button>
      </article>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "AdminArea",
  components: {
    Header
  },
  data() {
    return {
      product: {
        title: "",
        price: 0,
        shortDesc: "",
        longDesc: "",
        imgFile: ""
      },
      updateProductForm: {
        title: "",
        price: 0,
        shortDesc: "",
        longDesc: "",
        imgFile: ""
      },
      activateUpdateMode: false,
      displayImgCreate: false,
      displayImgUpdate: false
    };
  },
  computed: {
    getProductList() {
      return this.$store.state.productList;
    },
    getCurrentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    loginAdmin() {
      this.$store.dispatch("logInUser", this.admin);
    },
    createProduct() {
      this.$store.dispatch("createProduct", this.product);
    },
    updateProduct() {
      this.$store.dispatch("updateProduct", this.updateProductForm);
    },
    deleteProduct(product) {
      this.$store.dispatch("deleteProduct", product);
    },
    toggleUpdateMode(product) {
      this.displayImgUpdate = true
      this.updateProductForm = product;
      this.activateUpdateMode = !this.activateUpdateMode;
    },
    showImgCreate() {
      this.displayImgCreate = true
    },
  }
};
</script>

<style scoped>
.admin-area-container {
  max-width: 1000px;
  margin: 0 auto;
}
.login {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-product {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-product form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.product {
  width: 15rem;
  border: 1px dotted red;
}
img {
  width: 10%;
}
.updateProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>