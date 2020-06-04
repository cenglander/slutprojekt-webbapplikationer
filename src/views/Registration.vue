<template>
    <div class="registration-container">
        <Header/>
        <p>Registration</p>
        <form @submit.prevent="createUser">
        <input type="text" v-model="user.email" placeholder="email">
        <input type="text" v-model="user.password" placeholder="password">
        <input type="text" v-model="user.repeatPassword" placeholder="repeatPassword">
        <input type="text" v-model="user.name" placeholder="name">
        <input type="text" v-model="user.adress" placeholder="adress">
        <input type="text" v-model="user.street" placeholder="street">
        <input type="text" v-model="user.city" placeholder="city">
        <input type="text" v-model="user.zip" placeholder="zip">
        <input type="submit">
    </form>
    </div>
</template>

<script>
export default {
name: 'Registration',
data() {
    return {
        user: {
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
            adress: "",
            street: "",
            city: "",
            zip: ""
        }
    }
},
methods: {
    createUser() {
        this.$store.dispatch('createUser', this.user);
    }
}
}
</script>

<style scoped>
.registration-container form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>