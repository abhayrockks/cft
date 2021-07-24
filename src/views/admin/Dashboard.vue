<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="top" :color="color">
      {{ text }}
    </v-snackbar>
    <v-card class="py-2 px-4">
      <v-card-title>Welcome Boss <v-icon @click="showLove" color="red" medium class="ml-2"> mdi-heart </v-icon></v-card-title>
      <div class="mt-5 d-flex justify-center">
        <img src="../../assets/dashboard.jpg" width="30%" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      snackbar: false,
      top: "top",
      color: "error",
      timeout: 3000,
    };
  },
  computed: {
    ...mapState("loginModule", {
      text: (state) => state.handleMessage,
    }),
  },
  methods: {
    ...mapMutations("loginModule", ["handleMessage"]),
    showMessage(msg) {
        this.handleMessage(msg)
        this.snackbar = true
    },
    showLove() {
      this.showMessage("Love you")
    }
  },
};
</script>