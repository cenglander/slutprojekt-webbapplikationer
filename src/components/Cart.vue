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
    },
    methods: {
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
        },
        removeFromCart(product) {
            this.$store.commit('removeProductFromCart', product)
            console.log("not yet implemented i store")
        },
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