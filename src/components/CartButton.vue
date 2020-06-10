<template>

    <div class="cart-button" v-if="showCartButton"
        @click="showHideCart()">
        <p>Cart: {{ getAmountInCart }}</p>
    </div>

</template>

<script>
export default {
    name: 'CartButton',
    data: () => ({
    }),
    computed: {
        getAmountInCart() {
            return this.$store.getters.getAmountInCart
        },
        showCartButton() {
            return this.$store.state.showCartButton
        },
        showTheCart() {
            return this.$store.state.showCart
        }
    },
    methods: {
        unSelectProduct() {
            this.$store.commit('setSelectedProduct', null)
        },
        showHideCart() {
            this.$store.state.showCart = !this.$store.state.showCart
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