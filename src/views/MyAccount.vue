<template>
    <div class="my-account">
        <Header :CurrentLocation="'My Account'"/>
        <Cart v-if="getCartVisibility" />
        <div class="currentOrder" v-if="getCurrentOrder">
            <h1>Current Order</h1>
            <ul>
                <li v-for="item in getCurrentOrder"
                    :key="item.product._id">
                    <img :src="require('@/assets/img/' + item.product.imgFile)" alt="Product Foto">    
                    <p>{{item.product.title}}</p>
                    <p>x {{item.amount}}</p>
                    <p>Subtotal: </p>
                    <p class="kr">{{item.amount*item.product.price}} kr</p>
                </li>
            </ul>
            <div class="summary">
                <p>Status: inProcess</p>
                <p>Total: </p>
                <h3>{{getSum}} kr</h3>
            </div>
        </div>
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
        </div>
        <div class="noUser" v-else>
            <h1 class="plsLogin">Please log in</h1>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Cart from '@/components/Cart'

export default {
    name: 'MyAccount',

    data() { return {
        orders:[]
    }},

    components: {
        Header,
        Cart,
    },

    methods: {
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
            let product = this.$store.state.productList.filter(product => product._id === id)
            return product
            
        }

    },

    computed: {
        getUser() {
            return this.$store.state.currentUser
        },
        getCurrentOrder() {
            return this.$store.state.awaitedOrder
        },
        getCartVisibility() {
            return this.$store.state.showCart
        },
        getSum() {
            let sum = 0
            for(let item of this.$store.state.awaitedOrder) {
                sum += item.amount*item.product.price
            }
            return sum
        }
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

    .currentOrder {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #EBEBEB;
        min-width: 42rem;
        max-width: 700px;
        margin: 0;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-radius: 2rem;
        margin-top: 3rem;
        margin-bottom: 3rem;

        ul {
            padding: 0;
            padding: 0;
            margin: 0;

            li:nth-child(even) {
                background-color: white;
            }

            li {
                margin: 0;
                list-style: none;
                display: grid;
                grid-template-columns: 1fr 3fr 1fr 2fr 1fr;
                width: 35rem;
                background-color: #F1F1F1;

                img {
                    width: 3rem;
                    height: 3rem;
                }
                .kr {
                    text-align: right;
                    padding-right: 1rem;
                }

            }

        }
        .summary {
            align-self: flex-end;
            margin-right: 4.6rem;
            text-align: right;
        }

    }

    .userPresent{
        display: flex;
        align-items: center;
        flex-direction: column;

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

                margin-right: 3rem;
                margin-top: 2rem;

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