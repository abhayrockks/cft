<template>
  <v-container class="d-flex justify-center">
    <v-card>Hi {{ guestName }}</v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   data() {
    return { 
    }
  },
  computed: {
    ...mapGetters("loginModule", { username: "username" }),
    guestName() {
      let name
      if (this.username) {
         name = this.username
      } else {
         name = JSON.parse(localStorage.getItem('username'))
      }
      return name
    }
  },
  methods: {},
};
</script>