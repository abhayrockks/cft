<template>
  <div class="register">
    <p>Register</p>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="signUp">Register</button>
    <br>
    <span @click="routetoLogin">Login</span>
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
        signUp() {
            console.log(this.email, this.password)
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.routetoLogin
            console.log(user)
          },
          err => {
            alert(err.message);
          }
        );
        },
        routetoLogin() {
            this.$router.replace('/')
        }
    }
}
</script>