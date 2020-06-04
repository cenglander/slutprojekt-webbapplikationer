<template>

    <div class="cart-button"
        @click="showHideCart()">
        <p>Cart</p>
    </div>

</template>

<script>
export default {
    name: 'CartButton',
    data: () => ({
        
    }),
    methods: {
        showHideCart() {

        }
    }
}
</script>

<style scoped lang="scss">
    div .cart-button {
        width: 2rem;
        height: 1rem;
        background: chocolate;
    }
</style>