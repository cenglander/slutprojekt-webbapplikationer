<template>
    <div class="login-container" :class="{ noDisplay : showLogin }">
        <h3>Login</h3>
        <form @submit="submit">
            <div class="close" @click="closeLogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
            <p class="input-email">
                <label for="email">E-mail</label>
                <input id="email" v-model="email" placeholder="E-mail" type="text" name="email" :class="noEmail" />
            </p>
            <p class="input-password">
                <label for="password">Password</label>
                <input id="password" v-model="password" placeholder="Password" type="text" name="password" :class="noPassword" />
            </p>
            <p class="submit-button">
                <input type="submit" value="Resgister" />
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data() { return {
        email: "",
        password: "",
        noPasswordInput: false,
        noEmailInput: false,
        wrongInput: false
    }},

    methods: {
        async submit() {
                // resetting warning colors
            this.noEmailInput = false
            this.noPasswordInput = false
            this.wrongInput = false
            let response = null
            if (this.email && this.password) { // there are both email and password
                response = await this.$store.dispatch('logInUser', this.email, this.password)
            } else if (!this.email) {
                this.noEmailInput = true
            } else if (!this.password) {
                this.noPasswordInput = true
            }
            if (response !== null  && response.status == 200) {
                this.$store.state.showLogin = false
            } else {
                this.wrongInput = true
            }
        },

        closeLogin() {
            this.$store.state.showLogin = false
            this.email = ""
            this.password = ""
            this.noEmailInput = false
            this.noPasswordInput = false
            this.wrongInput = false
        }
    },

    computed: {
        showLogin() {
            return this.$store.state.showLogin
        },
        color() {
            return this.checked ? "#0E927D" : "none";
        },
        noPassword() {
            return { red: this.noPasswordInput };
        },
        noEmail() {
            return { red: this.noEmailInput };
        },
    }


}
</script>

<style>
.noDisplay {
    display: none;
}
.login-container {
    background-color: white;
    position: absolute;
    right: 3rem;
    top: 2rem;
}
</style>