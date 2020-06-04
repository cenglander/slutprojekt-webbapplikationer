<template>

    <div class="cart-button"
        @click="showHideCart()">
        <p>Cart: {{ amountOfProducts }}</p>
    </div>

</template>

<script>
export default {
    name: 'CartButton',
    data: () => ({
        showCart: this.$store.state.showCart
    }),
    computed: {
        amountOfProducts() {
            console.log("amount of products")
            return this.$store.state.productsInCart.length
        },
    },
    methods: {
        showHideCart() {
            console.log(this.showCart)
        },
    },
}
</script>

<style scoped lang="scss">
    div .cart-button {
        width: 4rem;
        height: 4rem;
        background: chocolate;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>