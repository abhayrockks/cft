<template>
  <v-app>
    <v-app-bar color="black" absolute dark v-if="guestName !== 'leenabhay' || this.$route.name === 'Login'">
      <div class="text-uppercase white--text font-weight-bold">Civilisation Forbidden Thoughts</div>
      <v-spacer></v-spacer>
      <div v-if="guestName"><v-btn @click="logOut">Log Out</v-btn></div>
    </v-app-bar>
     <v-app-bar fixed v-if="guestName === 'leenabhay'"
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
  
        <v-app-bar-title class="headerWidth">Civilisation Forbidden Thoughts</v-app-bar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn @click="logOut">
          <!-- <v-icon>mdi-dots-vertical</v-icon> -->
          Logout
        </v-btn>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab to="/dashboard">Dashboard</v-tab>
            <v-tab to="/topics">Topics</v-tab>
            <v-tab to="/content">Content</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
        <v-container :class="guestName === 'leenabhay' ? 'mainContainer' : 'mt-15'">
          <v-main>
      <router-view />
    </v-main>
        </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
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
  methods: {
    ...mapMutations("loginModule", ["handleMessage","del_info"]),
    async logOut() {
      localStorage.clear()
      await this.del_info()
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.mainContainer {
  margin-top: 220px !important
}
.headerWidth {
  max-width: 350px !important;
}
>>>.v-app-bar-title__content  {
  width: 340px !important;
}
</style>