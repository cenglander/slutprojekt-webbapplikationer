<template>
    <div class="login-container" v-if="!showLogIn">
        <div class="triangle">
            <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7915 1.80746C14.5707 0.527088 16.4293 0.527087 17.2085 1.80746L30.5376 23.7103C31.3487 25.0431 30.3893 26.75 28.8291 26.75H2.17085C0.61066 26.75 -0.348731 25.0431 0.462354 23.7103L13.7915 1.80746Z" fill="white"/></svg>
        </div>
        <div class="close" @click="closeLogin">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </div>
        <div class="logInForm" v-if="!logedIn">
            <h3>Login</h3>
            <form @submit.prevent="submit">
                <div class="input-email">
                    <label for="email">E-mail</label>
                    <input id="email" v-model="email" placeholder="E-mail" type="text" name="email" :class="noEmail" />
                </div>
                <div class="input-password">
                    <label for="password">Password</label>
                    <input id="password" v-model="password" placeholder="Password" type="text" name="password" :class="noPassword" />
                </div>
                <div class="submit-button">
                    <input type="submit" value="SIGN IN" />
                </div>
            </form>
        </div>
        <div class="buttonsLoggedIn" v-if="logedIn">
            <div class="logout-button">
                <input type="button" @click="signOut" value="SIGN OUT" />
            </div>
            <div class="profile">
                <input type="button" @click="goToProfile" value="PROFILE" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data() { return {
        email: "admin@example.com",
        password: "password",
        noPasswordInput: false,
        noEmailInput: false,
        wrongInput: false,
        logedIn: false
    }},

    methods: {
        async submit() {
                // resetting warning colors
            this.noEmailInput = false
            this.noPasswordInput = false
            this.wrongInput = false
            let response = null
            if (this.email !== `` && this.password !== ``) { // there are both email and password
                response = await this.$store.dispatch('logInUser', { email : this.email, pass : this.password})
                this.logedIn = true
                this.closeLogin()
            } else if (!this.email) {
                this.noEmailInput = true
            } else if (!this.password) {
                this.noPasswordInput = true
            }
            if (response !== null  && response.status == 200) {
                this.$store.state.showLogIn = !this.$store.state.showLogIn
            } else {
                this.wrongInput = true
            }
        },

        closeLogin() {
            this.$store.state.showLogIn = false
            this.email = ""
            this.password = ""
            this.noEmailInput = false
            this.noPasswordInput = false
            this.wrongInput = false
        },

        signOut() {
            sessionStorage.removeItem('sinus-token')
            sessionStorage.removeItem('sinus-user')
            this.logedIn = false
            this.closeLogin()
            this.$store.state.currentUser = null
        },
        goToProfile() {
            this.closeLogin()
            this.$router.push('myaccount')
        },
        register() {
            this.$router.push('registration')
        }
    },

    computed: {
        showLogIn() {
            return !this.$store.state.showLogIn
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
    },

    created() {
        if (sessionStorage.getItem('sinus-token') && sessionStorage.getItem('sinus-user')) {
            this.logedIn = true
        }
    }


}
</script>

<style scoped lang="scss">
.noDisplay {
    display: none;
}
.login-container {
    position: absolute;
    right: 1rem;
    top: 4rem;

    .triangle{
        position: absolute;
        top: -1rem;
        right: 0.4rem;
    }
    .logInForm {
        .input-email, .input-password {
            display: grid;
            grid-template-columns: 1fr 2fr;
            text-align: left;
            margin-bottom: 1rem;
        }
    }

    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border: 2px solid lightgrey;
    border-radius: 1rem;
    min-width: 10rem;
    min-height: 5rem;

    .buttonsLoggedIn {
        div {
            input {
                border: none;
                border-radius: 0.7rem;
                height: 2rem;
                width: 6rem;
                margin: 1rem;
            }
        }
    }

}
</style>