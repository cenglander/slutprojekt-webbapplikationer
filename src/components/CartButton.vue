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
        // showTheCart: this.$store.state.showCart
        showTheCart: false
    }),
    computed: {
        amountOfProducts() {
            console.log("amount of products")
            return this.$store.state.productsInCart.length
        },
    },
    methods: {
        unSelectProduct() {
            this.$store.commit('setSelectedProduct', null)
        },
        showHideCart() {
            this.showTheCart = this.$store.state.showCart
            this.showTheCart = !this.showTheCart
            this.$store.commit('changeCartVisibility', this.showTheCart)
            if(this.showTheCart) {
                this.unSelectProduct()
                console.log('in cartbutton - closing product when opening cart')
                this.$emit("false")
            } else {
                this.$emit("true")
            }
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