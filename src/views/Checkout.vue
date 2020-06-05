<template>
    <div class="checkout-container">
        <Header/>
        <h1>Checkout</h1>
        <div class="items">
            <h3>Items in cart</h3>
            <div class="item"   v-for="product in getProductsInCart"
                                :key="product._id">
                <img v-bind:src="require('@/assets/img/' + product.imgFile)" />
                <h3>{{product.title}}</h3>
                <p>{{product.price}}</p>
            </div>
        </div>
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
            items: [], // item._id only
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
        }
    },

    methods: {
        submit() {
            console.log('submitting order');
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
            console.log('dispatching addOrder');
            console.log(this.$store.dispatch('addOrder', this.order))
            this.$router.push('myaccount')
        }
    }
}
</script>

<style scoped lang="scss">
.checkout-container {
    .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60rem;
        border: 3px black solid;
        border-radius: 5px;
        .item {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            max-height: 10rem;
            max-width: 40rem;
            img {
                max-width: 3rem;
                max-height: 3rem;
            }
        }
    }
}

</style>