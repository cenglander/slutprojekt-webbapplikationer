<template>
    <div class="registration-container">
<<<<<<< HEAD
        <Header/>
=======
        <Header />
>>>>>>> bdafe00d581e6d76eecd5a54f449bd3464ed0475
        <p>Registration</p>
        <div class="create-account-container">
            <input type="email" v-model="user.email" placeholder="email">
            <input type="password" v-model="user.password" placeholder="password">
            <input type="password" v-model="user.repeatPassword" placeholder="repeatPassword">
            <input type="text" v-model="user.name" placeholder="name">
            <input type="text" v-model="user.adress.street" placeholder="street">
            <input type="text" v-model="user.adress.city" placeholder="city">
            <input type="numbers" v-model="user.adress.zip" placeholder="zip">
            <button v-on:click="createUser">create user</button>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
name: 'Registration',
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
    }
},
methods: {
    createUser() {
        this.$store.dispatch('registerUser', this.user);
    }
}
}
</script>

<style scoped>
.create-account-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>