<template>
    <div class="my-account">
        <Header/>
        <div v-if="getUser">
            <div class="profile">
                <h1>{{getUser.name}}</h1>
                <h3>{{getUser.role}}</h3>
                <p>E-mail: {{getUser.email}}</p>
            </div>
            <div class="adress">
                <h3>Adress</h3>
                <p>Street: {{getUser.adress.street}}</p>
                <p>ZIP: {{getUser.adress.zip}}</p>
                <p>City: {{getUser.adress.city}}</p>
            </div>
            <div class="orders">
                <p>_____________________________________</p>
                <h3>Orders</h3>
                <ul>
                    <li v-for="singleOrder in orders" 
                        :key="singleOrder._id">
                        <p>_____________________________________</p>
                        <p>Time: {{singleOrder.timeStamp}}</p>
                        <p>Status: {{singleOrder.status}}</p>
                        <p>Value: {{singleOrder.orderValue}}</p>
                        <p>Items: {{singleOrder.items.length}}</p>
                        <p>_____________________________________</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <h1>Please log in</h1>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'MyAccount',

    data() { return {
        orders:[]
    }},

    components: {
        Header
    },

    computed: {
        getUser() {
            return this.$store.state.currentUser
        },
    },

    async created() {
        let orders = await this.$store.dispatch('getAllOrders')
        this.orders = orders
    }


}
</script>

<style scoped lang="scss">
li {
    list-style: none;
}
</style>