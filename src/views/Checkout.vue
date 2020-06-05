<template>
    <div class="checkout-container">
        <Header/>
        <p>---------------------------------------------</p>
        <h1>Checkout</h1>
        <p>---------------------------------------------</p>
        <h3>Items in cart</h3>
        <ul class="items">
            <li class="item"    v-for="(item, index) in getProductsInCart"
                                :key="index">
                <img v-bind:src="require('@/assets/img/' + item.product.imgFile)" />
                <h3>{{item.product.title}}</h3>
                <p>{{item.product.price}}</p>
                <p>Amount: {{item.amount}}</p>
                <button @click="addToCart(item.product)">+</button>
                <button @click="removeFromCart(item.product)">-</button>
            </li>
        </ul>
        <h3>SUM - {{getSum}}</h3>
        <div class="paymentM">
            <form @submit.prevent="submit">
                <h3>Payment Method</h3>
                <input type="radio" id="card" name="paymentMethod" value="card">
                <label for="card">Card</label><br>
                <input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer">
                <label for="bankTransfer">Bank transfer</label><br>
                <input type="radio" id="kidney" name="paymentMethod" value="kidney">
                <label for="kidney">Kidney</label><br>
                <button type="submit">SUBMIT ORDER</button>
            </form>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'Checkout',

    data() { return {
        order: {
            items: [], // item._ids only
            _id: "thisDoesntMatter"
        }
    }},

    components: {
        Header
    },

    computed: {
        getProductsInCart() {
            return this.$store.state.productsInCart
        },
        getCurrentuser() {
            return this.$store.state.currentUser
        },
        getSum() {
            let sum = 0
            for ( let itemInCart of this.$store.state.productsInCart) {
                sum += itemInCart.amount*itemInCart.product.price
            }
            return sum + `:-`
        }
    },

    methods: {
        submit() {
            // adding item _ids to order.items
            for(let itemInCart of this.$store.state.productsInCart) {
                if(itemInCart.amount > 1) {
                    for (let i = 1; i < itemInCart.amount; i++) {
                        this.order.items.push(itemInCart.product._id)
                    }
                } else {
                    this.order.items.push(itemInCart.product._id)
                }
            }
            this.$store.dispatch('addOrder', this.order)
            this.$router.push('myaccount')
        },
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
        },
        removeFromCart(product) {
            this.$store.commit('removeProductFromCart', product)
        },
    },

    created() {
        this.$store.commit('restoreSession')
    }
}
</script>

<style scoped lang="scss">
.checkout-container {
    .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 60rem;
        border: 3px black solid;
        border-radius: 5px;
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            max-height: 10rem;
            max-width: 40rem;
            img {
                margin-right: 1rem;
            }
            p {
                margin-left: 1rem;
                margin-right: 1rem;
            }
            img {
                max-width: 3rem;
                max-height: 3rem;
            }
            button {
                max-height: 2rem;
                max-width: 2rem;
            }
        }
    }
}

</style>