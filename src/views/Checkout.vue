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
        <h3>Payment Method</h3>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'Checkout',

    components: {
        Header
    },

    computed: {
        getProductsInCart() {
            return this.$store.state.productsInCart
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