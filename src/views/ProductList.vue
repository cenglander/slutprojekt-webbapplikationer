<template>
    <div class="product-list-container">
        
        <Header/>
        <Cart v-if="getCartVisibility" />
        <Product v-if="getSelectedProduct!=null" />
        
        <ul class="product-grid">
            <li v-for='product in getProductList'
                :key="product._id">
                <div class="product-img"
                    @click="showProduct(product)">
                    <img class="product" 
                        :src="require('@/assets/img/' + product.imgFile)" />
                    <img class="add-to-cart"
                        :src="require('@/assets/img/add-circle-outline.svg')" 
                        @click="addToCart(product)">    
                </div>
                <p>{{ product.title }}</p>
                <p>{{ product.shortDesc }}</p>
                <p class="bold">{{ product.price }} SEK</p> 
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
        },
        showProduct(product) {
            this.$store.commit('setSelectedProduct', product)
        },
    },
    created() {
        this.$store.commit('restoreSession')
    }

}
</script>

<style scoped lang="scss">
    div.product-list-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0;
        background: #F0F0F0;;
        ul.product-grid {
            width: 60rem;
            margin: 0 auto;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(3, 20rem);
            grid-template-rows: repeat(3, 20rem);
            list-style-type: none;
            li {
                margin: 1rem;
                p {
                    font-size: 0.8rem;
                    padding: 0;
                    margin: 0 1rem;
                    text-align: left;
                }
                p.bold {
                    font-weight: bold;
                }
                div.product-img {
                    background: #EBEBEB;
                    border-radius: 1rem;
                    height: 12rem;
                    padding: 0.8rem;
                    margin-bottom: 0.6rem;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    img.add-to-cart {
                        width: 2rem;
                        height: 2rem;
                        color: black;
                        grid-column: 3;
                        display: flex;
                        justify-self: flex-end;
                    }
                    img.product {
                        display: flex;
                        justify-self: center;
                        align-self: center;
                        height: 10rem;
                        grid-column: 2;
                    }
                }
            }   
        }  
    }
    @media screen and (max-width: 980px) {
        div.product-list-container {
            ul.product-grid {
                width: 40rem;
                grid-template-columns: repeat(2, 20rem);
            }
        }
    }
    @media screen and (max-width: 650px) {
        div.product-list-container {
            margin: 0 auto;
            ul.product-grid {
                width: 30rem;
                grid-template-columns: repeat(1, 30rem);
            }
        }
    }
</style>