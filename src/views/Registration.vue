<template>
  <div class="registration-container">
    <Header :CurrentLocation="'Registration'"/>
    <div class="create-account-container" v-if="!userCreated">
      <div class="error" v-if="error" >
        <p>{{error}}</p>
      </div>
        <div class="email-container">
            <p :class="errorEmail" >Email:</p>
            <input type="email" v-model="user.email" placeholder=""/>
        </div>
        <div class="password-container">
            <p :class="errorPass">Password:</p>
            <input type="password" v-model="user.password" placeholder=""/>
        </div>
        <div class="repeat-password-container">
            <p  :class="errorRePass">Repeat Password:</p>
            <input type="password" v-model="user.repeatPassword" placeholder=""/>
        </div>
        <div class="name-container">
            <p  :class="errorName">Name:</p>
            <input type="text" v-model="user.name" placeholder=""/>
        </div>
        <div class="street-container">
            <p :class="errorStreet">Street:</p>
            <input type="text" v-model="user.adress.street" placeholder=""/>
        </div>
        <div class="city-container">
            <p  :class="errorCity">City:</p>
            <input type="text" v-model="user.adress.city" placeholder=""/>
        </div>
        <div class="zip-container">
            <p :class="errorZip" >Zip:</p>
            <input type="numbers" v-model="user.adress.zip" placeholder=""/>
        </div>
      <button class="create-button" v-on:click="createUser">Create Account</button>
    </div>

    <div class="userCreated" v-else>
      <h1>User created!</h1>
      <router-link :to="'productlist'">
        <button>HOME</button>
      </router-link>
      <router-link :to="'myaccount'">
        <button>PROFILE</button>
      </router-link>
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
      userCreated: false,
      error: "",
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
      },
      vlidationErrors: {
        email: false,
        password: false,
        repeatPassword: false,
        name: false,
        street: false,
        city: false,
        zip: false
      }
    };
  },

  computed: {
    errorEmail() {
      return { red : this.vlidationErrors.email}
    },
    errorPass() {
      return { red :this.vlidationErrors.password}

    },
    errorRePass() {
      return { red :this.vlidationErrors.repeatPassword}

    },
    errorName() {
      return { red :this.vlidationErrors.name}

    },
    errorStreet() {
      return { red :this.vlidationErrors.street}

    },
    errorCity() {
      return { red :this.vlidationErrors.city}

    },
    errorZip() {
      return { red :this.vlidationErrors.zip}

    }
  },

  methods: {
    async createUser() {
      if(this.validate()) {
        let response = await this.$store.dispatch("registerUser", this.user);
        this.$store.commit("changeCartVisibility", false);
        this.$store.commit("changeLoginVisibility", false);
        console.log(response);
        
        if (response.errors) {
          this.error = response.errors[0]
        } else {
          this.userCreated = true
        }

        this.$store.dispatch('logInUser', { email: this.user.email, pass: this.user.password})
          
      }
    },
    validate() {
      this.vlidationErrors = {
        email: false,
        password: false,
        repeatPassword: false,
        name: false,
        street: false,
        city: false,
        zip: false
      }
      let passed = true
      if(this.user.email==="") {
        passed = false
        this.vlidationErrors.email = true
      }
      if(this.user.password==="") {
        passed = false
        this.vlidationErrors.password = true
      }
      if(this.user.repeatPassword==="") {
        passed = false
        this.vlidationErrors.repeatPassword = true
      }
      if(this.user.name==="") {
        passed = false
        this.vlidationErrors.name = true
      }
      if(this.user.adress.street==="") {
        passed = false
        this.vlidationErrors.street = true
      }
      if(this.user.adress.city==="") {
        passed = false
        this.vlidationErrors.city = true
      }
      if(this.user.adress.zip==="") {
        passed = false
        this.vlidationErrors.zip = true
      }
      return passed
    }
  },
  created() {
    this.userCreated = false
    this.error = ""
    this.$store.state.showCartButton = false;
  }
};
</script>

<style scoped lang="scss">
.registration-container {
  -webkit-box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.75);
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
    -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
}
.password-container, .name-container, .city-container {
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    width: 26rem;
    -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
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
  cursor: pointer;
  outline: 0;
  font-size: 1rem;
  width: 10rem;
  padding: 1rem;
  border-radius: 3rem;
  position: absolute;
  bottom: 2rem;
  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  
        &:hover {
            transform: scale(1.02);
        }
        &:focus {
            transform: scale(0.97);
        }
}
.userCreated {
  background-color: white;
  width: 30rem;
  height: 12rem;
  border-radius: 2rem;
  padding-top: 1rem;
  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);

}
.userCreated button {
  width: 7rem;
  height: 3rem;
  margin: 1.3rem;
  border-radius: 1.5rem;
  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);

}
.userCreated button:hover {
  transform: scale(1.03);
}
.userCreated button:active {
  transform: scale(0.9);
}
.red {
  color: red;
}
</style>