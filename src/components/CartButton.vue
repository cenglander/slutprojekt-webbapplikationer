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
        
    }),
    computed: {
        amountOfProducts() {
            console.log(this.$store.state.productsInCart.length)
            return this.$store.state.productsInCart.length
        }
    },
    methods: {
        showHideCart() {
            console.log("hej")
        }
    }
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