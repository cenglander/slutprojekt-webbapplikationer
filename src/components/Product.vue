<template>
    <div class="product-container">
        <div class="product">
            <!-- <button class="close" @click="unSelectProduct(selectedProduct)">CLOSE</button> -->
            <img class="add-to-cart"
                        :src="require('@/assets/img/add-circle-outline.svg')" 
                        @click="addToCart(selectedProduct)"> 
            <img class="product"
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
    // .product-modal { 
    //     background: rgba(0,0,0,0.5); }
        div.product-container {
            background: rgba(0,0,0,0.5);
            
            .product {
                background: #EBEBEB;
                width: 30rem;
                margin: 0 auto;
                border-radius: 2rem;
                display: grid;
                grid-auto-columns: repeat(6, 1fr);
                grid-auto-rows: repeat(6, 1fr);

                img.add-to-cart {
                    width: 3.5rem;
                    height: 3.5rem;
                    color: black;
                    grid-column: 6;
                    grid-row: 1;
                }
                img.product {
                    // display: flex;
                    // justify-self: center;
                    // align-self: center;
                    // height: 10rem;
                    grid-column: span 1 / 3;
                    grid-row: span 3 / 6;
                    width: 15rem;
                }
                h2.title {
                    grid-column: span 4 / 7;
                    grid-row: span 2 / 3;
                }
                h4.shortDesc {
                    grid-column: span 4 / 7;
                    grid-row: span 3 / 4;
                }
                p.price {

                }
                p.longDesc {

                }
            }

    //     display: flex;
    //     justify-content: center;
    //     .product {
    //         background: lightslategrey;
    //         width: 50rem;
    //         height: 50rem;
    //         margin: 0 auto;
    //         // z-index: 10;
    //         position: absolute;
    //         img {
    //             height: 25rem;
    //         }
    //         button {
    //             width: 5rem;
    //             height: 5rem;
    //         }
    //         // .close {
    //         //     //put in right corner?
    //         // }
    //         // .add-to-cart {
    //         // }
    //     }
    // }
    }
</style>