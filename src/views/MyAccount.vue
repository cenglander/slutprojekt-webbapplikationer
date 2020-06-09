<template>
    <div class="my-account">
        <Header :CurrentLocation="'My Account'"/>
        <Cart v-if="getCartVisibility" />
        <div class="userPresent" v-if="getUser">
            <h1>Profile: {{getUser.role}}</h1>
            <div class="profile">
                <div class="profileInfo">
                    <div>
                        <p>Name: </p>
                        <p>{{getUser.name}}</p>
                    </div>
                    <div>
                        <p>E-mail: </p>
                        <p>{{getUser.email}}</p>
                    </div>
                    <div>
                        <p>Street: </p>
                        <p>{{getUser.adress.street}}</p>
                    </div>
                    <div>
                        <p>ZIP: </p>
                        <p>{{getUser.adress.zip}}</p>
                    </div>
                    <div>
                        <p>City: </p>
                        <p>{{getUser.adress.city}}</p>
                    </div>
                </div>
                <div class="picture">
                    <img :src="require('@/assets/img/person-circle-outline.svg')" alt="">
                </div>
            </div>
            <div class="orders">
                <h1>Order History</h1>
                <button :click="refreashOrders">Refreash</button>
                <ul class="listOfOrders">
                    <li v-for="singleOrder in orders" 
                        :key="singleOrder._id">
                        <p>{{getDate(singleOrder.timeStamp)}}</p>
                        <p>{{getTime(singleOrder.timeStamp)}}</p>
                        <p>{{singleOrder.status}}</p>
                        <p>{{singleOrder.orderValue}} kr</p>
                        <p>Items: {{singleOrder.items.length}}</p>
                    </li>
                </ul>
            </div>
            <div v-if="getCurrentOrder">
                {{getCurrentOrder}}
            </div>
        </div>
        <div class="noUser" v-else>
            <h1 class="plsLogin">Please log in</h1>
            <div v-if="getCurrentOrder">
                <div  v-for="item in getCurrentOrder"
                    :key="item">
                    {{getProduct(item)}}
                </div>
            </div>
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

    methods: {
        async refreashOrders() {
            this.orders = await this.$store.dispatch('getAllOrders')
        },
        getTime(timeStamp) {
            var date = new Date(timeStamp)
            var hours = date.getHours()
            var minutes = "0" + date.getMinutes()
            var seconds = "0" + date.getSeconds()
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return formattedTime
        },
        getDate(timeStamp) {
            var date = new Date(timeStamp)
            var day = date.getDay()
            if (day<10) {
                day = `0` + day
            }
            var month = date.getMonth()
            if (month<10) {
                month = `0` + month
            }
            var year = date.getFullYear()
            return year + `-` + month + `-` + day
        },
        getProduct(id) {
            return this.$store.state.productList.filter(product => product._id === id)
        }

    },

    computed: {
        getUser() {
            return this.$store.state.currentUser
        },
        getCurrentOrder() {
            return this.$store.state.awaitedOrder.items
        },
        getCartVisibility() {
            return this.$store.state.showCart
        },
    },
    async created() {
        this.$store.commit('restoreSession')
        this.orders = await this.$store.dispatch('getAllOrders')
    },
}
</script>

<style scoped lang="scss">

.my-account {
    margin: auto;
    background-color: #F0F0F0;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    min-height: 100vh;

    .userPresent{

        .profile {

            background-color: #EBEBEB;
            min-width: 40rem;
            max-width: 700px;
            margin: 0;
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
            border-radius: 2rem;
            margin-top: 3rem;
            margin-bottom: 3rem;
            display: grid;
            grid-template-columns: 2fr 1fr;

            .profileInfo {

                div:nth-child(even) {
                    background-color: white;
                }

                div {
                    height: 3rem;
                    margin: 0;
                    display: grid;
                    align-items: center;
                    margin-left: 3rem;
                    grid-template-columns: 2fr 4fr;
                    max-width: 22rem;
                    background-color: #F1F1F1;

                }
            }
            .picture {

                margin: auto;

                img {
                    height: 11rem;
                    widows: 11rem;
                    position: center;
                }
            }
        }  

        .orders {

            .listOfOrders {

                background-color: #EBEBEB;
                min-width: 40rem;
                max-width: 700px;
                margin: 0;
                padding-top: 3.5rem;
                padding-bottom: 3.5rem;
                border-radius: 2rem;
                margin-top: 3rem;
                margin-bottom: 3rem;

                li:nth-child(even) {
                    background-color: white;
                }

                li {
                    background-color: #F1F1F1;
                    margin: 0;
                    padding: 0;
                    max-width: 38rem;
                    list-style: none;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                }
            }
        }
    }

    .noUser {

        display: flex;
        justify-content: center;
        align-content: center;

    }
}




li {
    list-style: none;
}
</style>