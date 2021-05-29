<template>
  <div class="login">
    <h2>Login</h2>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Sign in</button>
    <p @click="routeToRegister">Register</p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            console.log(this.email, this.password)
            firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("/dashboard");
            console.log(user)
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
        },
        routeToRegister() {
            this.$router.replace('/register')
        }
    }
}
</script>