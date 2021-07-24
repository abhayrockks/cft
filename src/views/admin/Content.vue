<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="top" :color="color">
      {{ text }}
    </v-snackbar>
    <v-card class="py-2 px-4">
      <v-card-title>What are you thinking today ?<v-icon @click="showLove" color="red" medium class="ml-2"> mdi-heart </v-icon></v-card-title>
      <v-row>
          <v-col cols="12" md="6">
      <v-text-field v-model="title" outlined placeholder="Topic name"></v-text-field>
      </v-col>
      </v-row>
      <v-textarea v-model="body" filled auto-grow></v-textarea>
      <v-card-actions>
        <v-btn @click="saveData"
          ><v-icon small class="mr-2"> mdi-content-save </v-icon>Save</v-btn
        >
        <v-btn @click="editData"
          ><v-icon small class="mr-2"> mdi-pencil </v-icon>Edit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      title: "",
      body: "",
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
    saveData() {
      console.log(this.body, this.title);
    },
    editData() {
      console.log("Edit");
    },
    showMessage(msg) {
        this.handleMessage(msg)
        this.snackbar = true
    },
    showLove() {
      this.showMessage("Love you baby")
    }
  },
};
</script>