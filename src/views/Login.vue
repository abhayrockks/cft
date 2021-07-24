<template>
  <v-container class="d-flex justify-center">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="top" :color="color">
      {{ text }}
    </v-snackbar>
    <v-card flat class="pa-10">
      <v-card-title>Hi, I am bot</v-card-title>
      <v-card-text>I am here to help you, what should I call you ?</v-card-text>
        <v-text-field v-model="name" placeholder="Please enter name"></v-text-field>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="checkName">I'am in</v-btn>
      </v-card-actions>
      <div class="mt-5 d-flex justify-center">
        <img class="logo" src="../assets/logo _transparent.png" height="200px" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      snackbar: false,
      top: "top",
      color: "error",
      timeout: 2000,
    };
  },
  computed: {
    ...mapState("loginModule", {
      text: (state) => state.handleMessage,
    }),
  },
  methods: {
    ...mapActions("loginModule", ["handlelogin"]),
    ...mapMutations("loginModule", ["handleMessage"]),
    async checkName() {
      if (!this.name) {
        this.handleMessage("That rude, please provide me your name");
        return (this.snackbar = true);
      } else {
        this.handleMessage(`Pretty name ${this.name}`)
        this.snackbar = true
      }
      await this.handlelogin(this.name)
      localStorage.setItem("username",  JSON.stringify(this.name))
      if (this.name === "leenabhay") {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/guest");
      }
    },
  },
};
</script>

<style scoped>
.logo {
  animation: spin 8s infinite;
}
@keyframes spin {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>