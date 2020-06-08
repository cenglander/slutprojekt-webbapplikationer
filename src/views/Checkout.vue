<template>
    <div class="checkout-container">
        <Header/>
        <p>---------------------------------------------</p>
        <h1 class="checkoutText">Checkout</h1>
        <p>---------------------------------------------</p>
        <h3>Items in cart</h3>
        <ul class="items">
            <li class="item"    v-for="(item, index) in getProductsInCart"
                                :key="index">
                <img v-bind:src="require('@/assets/img/' + item.product.imgFile)" />
                <h3>{{item.product.title}}</h3>
                <p>{{item.product.price}} kr</p>
                <p>x {{item.amount}}</p>
                <button @click="addToCart(item.product)"><img v-bind:src="require('@/assets/img/add-circle-outline.svg')" /></button>
                <button @click="removeFromCart(item.product)"><img v-bind:src="require('@/assets/img/remove-circle-outline.svg')" /></button>
                <p>subtotal: {{item.amount*item.product.price}}</p>
            </li>
        </ul>
        <div class="summery">
            <h3>SUM - {{getSum}}</h3>
            <h3>Choose Payment Method</h3>
            <div class="paymentM">
                <form @submit.prevent="submit">
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
        this.$store.state.showCartButton = false
    }
}
</script>

<style scoped lang="scss">
.checkout-container {
    margin: auto;
    background-color: #F0F0F0;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #EBEBEB;
        min-width: 40rem;
        max-width: 700px;
        margin: 0;
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;
        border-radius: 2rem;
        .item:nth-child(even) {
            background-color: white;
        }
        .item {
            margin: 0;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 2fr;
            max-height: 10rem;
            min-width: 35rem;
            max-width: 600px;
            background-color: #F1F1F1;
            img {
                max-width: 3rem;
                max-height: 3rem;
            }
            button {
                background-color: transparent;
                border: none;
                color: none;
                margin: 0;
                padding: 0;
                max-height: 2rem;
                max-width: 2rem;
                img {
                    height: 2rem;
                    width: 2rem;
                }
            }
        }
    }
}
ul, li {
    padding: 0;
    margin: 0;
}

</style>