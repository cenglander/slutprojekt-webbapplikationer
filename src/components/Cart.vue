<template>
    <div class="cart-modal" v-if="showModal" v-on:click="toggleModal">
        <div class="cart-container">
            <ul class="items">
            <li class="item"    v-for="(item, index) in getProductsInCart"
                                :key="index">
                <img v-bind:src="require('@/assets/img/' + item.product.imgFile)" />
                <h3>{{item.product.title}}</h3>
                <p>{{item.product.price}} kr</p>
                <p>x {{item.amount}}</p>
                <button @click="addToCart(item.product)"><img v-bind:src="require('@/assets/img/add-circle-outline.svg')" /></button>
                <button @click="removeFromCart(item.product)"><img v-bind:src="require('@/assets/img/remove-circle-outline.svg')" /></button>
                <p>subtotal:</p>
                <h5>{{item.amount*item.product.price}} kr</h5>
            </li>
            <li class="summary">
                <p>Total:</p>
                <h3>{{getSum}} kr</h3>
                <p> incl. vat</p>
            </li>
            <button class="checkout-button" v-on:click="goToCheckout">Checkout</button>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    data: () => ({
        showModal: true
    }),
    computed: {
        getProductsInCart() {
            return this.$store.state.productsInCart
        },
        getTotalSumInCart() {
            let total = 0
            for (let item of this.$store.state.productsInCart) {
                let sumEach = item.product.price * item.amount
                total += sumEach
            }
            return total
        },
        getSum() {
            let sum = 0
            for ( let itemInCart of this.$store.state.productsInCart) {
                sum += itemInCart.amount*itemInCart.product.price
            }
            return sum
        }
    },
    methods: {
        addToCart(product) {
            this.$store.commit('addProductToCart', product)
        },
        removeFromCart(product) {
            this.$store.commit('removeProductFromCart', product)
        },
        goToCheckout() {
            this.$router.push('/checkout')
        },
        toggleModal() {
            this.showModal = !this.showModal
        }
    }
}
</script>

<style scoped lang="scss">
.cart-container {
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 800px;

    .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #EBEBEB;
        min-width: 40rem;
        max-width: 800px;
        margin: 0;
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;
        border-radius: 2rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
        .item:nth-child(even) {
            background-color: white;
        }
        .item {
            height: 5rem;
            margin: 0;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
            min-width: 35rem;
            background-color: #F1F1F1;
            img {
                max-width: 3rem;
                max-height: 3rem;
            }
            button {
                background-color: transparent;
                border: none;
                color: none;
                margin: 0;
                padding: 0;
                max-height: 2rem;
                max-width: 2rem;
                img {
                    height: 2rem;
                    width: 2rem;
                }
            }
        }
    }
}
.summary {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 35rem;
    p {
        margin: 1rem;
    }
}

.cart-modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
}
.checkout-button {
  width: 10rem;
  padding: 1rem;
  border-radius: 3rem;
  bottom: 2rem;
}
</style>