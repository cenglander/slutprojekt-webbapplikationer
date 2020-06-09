<template>
    <div class="product-container">
        <div class="product">
            <img class="close"
                        :src="require('@/assets/img/close-circle-outline.svg')" 
                        @click="unSelectProduct(selectedProduct)">
            <img class="add-to-cart"
                        :src="require('@/assets/img/add-circle-outline.svg')" 
                        @click="addToCart(selectedProduct)"> 
            <img class="product-img"
                        :src="require('@/assets/img/' + selectedProduct.imgFile)" />
            <h2 class="title">{{ selectedProduct.title }}</h2> 
            <h4 class="shortDesc">{{ selectedProduct.shortDesc }}</h4>
            <p class="price">{{ selectedProduct.price }} SEK</p>
            <p class="longDesc">{{ selectedProduct.longDesc }}</p>
            
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
        div.product-container {
            width: 1000px;
            height: 100%;
            background: rgba(0,0,0,0.5);
            padding: 7rem 0 0 0;
            margin: 0 auto;
            z-index: 5;
            position: absolute;
            div.product {
                background: #EBEBEB;
                // position: absolute;
                z-index: 10;
                margin: 0 auto;
                width: 36rem;
                height: 20rem;
                margin: 0 auto;
                padding: 2rem;
                border-radius: 2rem;
                display: grid;
                grid-template-areas: 
                    "product-img product-img . . . close"
                    "product-img product-img . title add-img ."
                    "product-img product-img . short short ."
                    "product-img product-img . price price ."
                    "product-img product-img . long long ."
                    ". . . long long .";
                grid-template-columns: repeat(6, 1fr);
                grid-template-rows: 4rem 3rem 2rem 2rem 6rem 3rem;
                -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
                -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
                box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
                img.close {
                    grid-area: close;
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-self: flex-end;
                }
                img.close:hover {
                    width: 2.1rem;
                    height: 2.1rem;
                }
                img.close:active {
                    width: 2rem;
                    height: 2rem;
                }
                img.add-to-cart {
                    grid-area: add-img;
                    width: 5rem;
                    height: 5rem;
                    color: black;
                    display: flex;
                    justify-self: flex-end;
                }
                img.add-to-cart:hover {
                    width: 5.1rem;
                    height: 5.1rem;
                }
                img.add-to-cart:active {
                    width: 5rem;
                    height: 5rem;
                }
                img.product-img {
                    grid-area: product-img;
                    width: 15rem;
                }
                h2.title {
                    grid-area: title;
                    text-align: left;
                }
                h4.shortDesc {
                    grid-area: short;
                    text-align: left;
                }
                p.price {
                    grid-area: price;
                    text-align: left;
                }
                p.longDesc {
                    grid-area: long;
                    text-align: left;
                    font-size: 0.8rem;
                }
            }
        }
        @media screen and (max-width: 980px) {
            div.product-container {
                max-width: 100vw;
            }
        }
</style>