<template>

    <div class="cart-container">
        <div class="cart">
            <h1>Varukorgen</h1>
            <ul>
                <li v-for="(product, index) in getProductsInCart"
                    :key="index">
                    <p>{{ product.title }} {{ product.price }}</p>
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
        // countAmountOfEachProduct() {
        //     let allProductsInCart = this.getProductsInCart       
        //     let amount = {}
        //     let counted = []
        //     console.log(allProductsInCart)
        //     for (let i = 0; i < allProductsInCart.length; i++) {
        //         let count = 1
        //         let currentProduct = allProductsInCart[i]
        //         console.log(currentProduct._id)
        //         console.log("mellan")
        //         console.log(currentProduct)
        //         for(let j = i+1; j < allProductsInCart.length; j++) {
        //             amount = {amount : count}
        //             counted.push({currentProduct}, {amount})
        //             counted.currentProduct
        //             console.log(counted)
        //         }
        //     }
        // }
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