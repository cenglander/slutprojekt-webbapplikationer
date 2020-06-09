<template>
    <div class="header-wrapper">
        <div class="nav">
            <ul>
                <router-link :to="'/productlist'">
                    <li>Products</li>
                </router-link>
                <router-link :to="'/myaccount'">
                    <li>My Account</li>
                </router-link>
                <router-link :to="'/adminarea'" v-if="isAdmin">
                    <li>Admin Area</li>
                </router-link>
                <router-link :to="'/checkout'">
                    <li>Checkout</li>
                </router-link>
                <li>
                    <CartButton />
                </li>
            </ul>
        </div>
        <div class="login-button" @click="showLogIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>
        </div>
        <LogIn/>
    </div>
</template>

<script>
import LogIn from '@/components/LogIn'
import CartButton from '@/components/CartButton'
export default {
    name: 'Header',
    
    components: {
        LogIn,
        CartButton,
    },

    methods:{
        showLogIn() {
            this.$store.state.showLogIn = !this.$store.state.showLogIn
        }
    },

    computed: {
        isAdmin() {
            if (this.$store.state.currentUser !== null){
                return this.$store.state.currentUser.role === `admin`
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #D8D8D8;
    .nav {
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            li {
                margin: 1rem;
            }
        }
    }
    .login-button {
        align-self: center;
        
    }
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  color: red;
}

a:active {
  text-decoration: none;
}
</style>