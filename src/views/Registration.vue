<template>
  <div class="registration-container">
    <Header />
    <h1>Registration</h1>
    <div class="create-account-container">
        <div class="label-container">
            <p>Email:</p>
            <p>Password:</p>
            <p>Password:</p>
            <p>Name:</p>
            <p>Street:</p>
            <p>City:</p>
            <p>Zip:</p>
        </div>
      <div class="input-container">
        <input type="email" v-model="user.email" placeholder="" />
        <input type="password" v-model="user.password" placeholder="" />
        <input type="password" v-model="user.repeatPassword" placeholder="" />
        <input type="text" v-model="user.name" placeholder="" />
        <input type="text" v-model="user.adress.street" placeholder="" />
        <input type="text" v-model="user.adress.city" placeholder="" />
        <input type="numbers" v-model="user.adress.zip" placeholder="" />
      </div>
      <button class="create-button" v-on:click="createUser">create account</button>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Registration",
  components: {
    Header
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        repeatPassword: "",
        name: "",
        adress: {
          street: "",
          city: "",
          zip: ""
        }
      }
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch("registerUser", this.user);
      this.$store.commit("changeCartVisibility", false);
      this.$store.commit("changeLoginVisibility", false);
    }
  }
};
</script>

<style scoped>
.registration-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.create-account-container {
    position: relative;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 5rem;
  border-radius: 3rem;
  width: 40rem;
  height: 30rem;
  background: #ebebeb;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.label-container {
    width: 5rem;
}
.label-container p {
    height: 1.5rem;
    text-align: left;
    margin: 0.1rem;
}
.input-container {
    width: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.input-container input {
    height: 1.2rem;
    font-size: 1rem;
}
.create-button {
  padding: 1rem;
  border-radius: 3rem;
  position: absolute;
  bottom: 4rem;
}
</style>