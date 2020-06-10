<template>
    <div>
        <img class="cart-button"
            :src="require('@/assets/img/cart-outline.svg')"
            @click="showHideCart()">
        <p>{{ getAmountInCart }}</p>
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
        // unSelectProduct() {
        //     this.$store.commit('setSelectedProduct', null)
        // },
        showHideCart() {
            this.$store.state.showCart = !this.$store.state.showCart
        },
    },
}
</script>

<style scoped lang="scss">
    div {
        img.cart-button {
        width: 3rem;
        height: 3rem;
        }
        p {
            margin: 0;
            font-weight: bold;
        }
    }
    // div.cart-button {
    //     width: 4rem;
    //     height: 4rem;
    //     background: chocolate;
    //     border-radius: 2rem;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    // }
</style>