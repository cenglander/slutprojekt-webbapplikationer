<template>
    <div class="product-container">
        <div class="product">
            <button class="close" @click="unSelectProduct(selectedProduct)">CLOSE</button>
            <h1>produkt-komponent</h1>
            <h2>{{ selectedProduct.title }}</h2>
            <img v-bind:src="require('@/assets/img/' + selectedProduct.imgFile)" />
            <h4>{{ selectedProduct.shortDesc }}</h4>
            <p>{{ selectedProduct.longDesc }}</p>
            <p>{{ selectedProduct.price }} SEK</p>
            <button class="add-to-cart"
                @click="addToCart(selectedProduct)">Add to cart</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product',
    computed: {
        selectedProduct() {
            return this.$store.state.selectedProduct
        },
    },
    methods: {
        unSelectProduct() {
            this.$store.commit('setSelectedProduct', null)
        },
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
            console.log("cart: ")
            console.log(this.$store.state.productsInCart)
        },
    }
}
</script>

<style scoped lang="scss">
    div .product-container {
        display: flex;
        justify-content: center;
        .product {
            background: lightslategrey;
            width: 50rem;
            height: 50rem;
            margin: 0 auto;
            // z-index: 10;
            position: absolute;
            img {
                height: 25rem;
            }
            button {
                width: 5rem;
                height: 5rem;
            }
            // .close {
            //     //put in right corner?
            // }
            // .add-to-cart {
            // }
        }
    }
</style>