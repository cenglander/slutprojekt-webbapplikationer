<template>
    <div class="product-list-container">
        
        <Header/>
        <Cart v-if="getCartVisibility" />
        <h1>Products</h1>
        <Product v-if="getSelectedProduct!=null" />
        <ul>
            <li v-for='product in getProductList'
                :key="product._id">
                <div class="imgDesc"
                    @click="showProduct(product)">

                    <img v-bind:src="require('@/assets/img/' + product.imgFile)" />
                
                    <h5>{{ product.title }}</h5>
                    <h5>{{ product.shortDesc }}</h5>
                    <h5>{{ product.price }}</h5>    
                </div>
                <button class="add-to-cart"
                    @click="addToCart(product)"
                    >Add to cart
                </button>
            </li>   
        </ul>
    </div>
</template>

<script>
import Product from '@/components/Product.vue'
import Header from '@/components/Header'
import Cart from '@/components/Cart'

export default {
    name: 'ProductList',
    components: {
        Product,
        Header,
        Cart,
    },
    computed: {
        getProductList() {
            return this.$store.state.productList    
        },
        getSelectedProduct() {
            return this.$store.state.selectedProduct
        },
        getCartVisibility() {
            return this.$store.state.showCart
        },
    },
    methods: {
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
            console.log("cart: ")
            console.log(this.$store.state.productsInCart)
        },
        showProduct(product) {
            this.$store.commit('setSelectedProduct', product)
            console.log(this.$store.state.selectedProduct.title)
        },
    },

}
</script>

<style scoped lang="scss">
    div .product-list-container {
        width: 90vw;
        height: cover;
        background: lightblue;

        ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: space-around;
            li {
                padding: 0;
                width: 20rem;
                background: lightpink;
                img {
                    width: 15rem;
                }
                // .add-to-cart {
                // }
            }   
        }  
    }
</style>