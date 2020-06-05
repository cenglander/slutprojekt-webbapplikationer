<template>

    <div class="cart-container">
        <div class="cart">
            <h1>Varukorgen</h1>
            <ul>
                <li v-for="(item, index) in getProductsInCart"
                    :key="index">
                    <button @click="addToCart(item.product)">Add</button>
                    <button @click="removeFromCart(item.product)">Remove</button>
                    <p>{{ item.product.title }}
                        --- Styckpris: {{ item.product.price }}--- Antal: {{ item.amount }}</p>
                </li>
            </ul>
            <h5>Total: {{ getTotalSumInCart }}</h5>
            <button @click="goToCheckout">BUY THIS STUFF!</button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Cart',
    data: () => ({
    }),
    computed: {
        getProductsInCart() {
            return this.$store.state.productsInCart
        },
        getTotalSumInCart() {
            let total = 0
            for (let item of this.$store.state.productsInCart) {
                let sumEach = item.product.price * item.amount
                total += sumEach
            }
            return total
        },
    },
    methods: {
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
        },
        removeFromCart(product) {
            this.$store.commit('removeProductFromCart', product)
        },
        goToCheckout() {
            this.$router.push('/checkout')
        }
    }
}
</script>

<style scoped lang="scss">
    div .cart-container {
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        z-index: 5;
        position: absolute;
        .cart {
            background: yellow;
            width: 30rem;
            height: 40rem;
            margin: 0 auto;
            position: absolute;
            z-index: 7;
        }
    }
</style>