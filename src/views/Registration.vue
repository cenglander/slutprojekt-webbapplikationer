<template>
  <div class="registration-container">
    <Header :CurrentLocation="'Registration'"/>
    <div class="create-account-container">
        <div class="email-container">
            <p>Email:</p>
            <input type="email" v-model="user.email" placeholder="" />
        </div>
        <div class="password-container">
            <p>Password:</p>
            <input type="password" v-model="user.password" placeholder="" />
        </div>
        <div class="repeat-password-container">
            <p>Repeat Password:</p>
            <input type="password" v-model="user.repeatPassword" placeholder="" />
        </div>
        <div class="name-container">
            <p>Name:</p>
            <input type="text" v-model="user.name" placeholder="" />
        </div>
        <div class="street-container">
            <p>Street:</p>
            <input type="text" v-model="user.adress.street" placeholder="" />
        </div>
        <div class="city-container">
            <p>City:</p>
            <input type="text" v-model="user.adress.city" placeholder="" />
        </div>
        <div class="zip-container">
            <p>Zip:</p>
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
  min-height: 100vh;
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
  margin-top: 5rem;
  border-radius: 3rem;
  width: 45rem;
  height: 35rem;
  background: #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.email-container, .repeat-password-container, .street-container, .zip-container {
    background: #F1F1F1;
    display: flex;
    justify-content: space-between;
    width: 26rem;
}
.password-container, .name-container, .city-container {
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    width: 26rem;
}
p {
    padding-left: 2rem;
}
input {
    background-color: transparent;
    border: 0px solid;
    width: 15rem;
    font-size: 1rem;
}
input:focus, textarea:focus {
    outline: none;
}
.create-button {
  width: 10rem;
  padding: 1rem;
  border-radius: 3rem;
  position: absolute;
  bottom: 2rem;
}
</style>