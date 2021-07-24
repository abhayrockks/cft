<template>
  <v-dialog v-model="isOpen" :activator="activator" persistent max-width="500">
    <v-card class="pt-6 pb-4">
      <v-card-text>
        <v-text-field v-model="topicName" label="Topic Name"></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-center">
         <v-btn large @click="close" color="error" class="px-10 mr-5">Cancel</v-btn>
         <v-btn :loading="loading" large color="success" class="px-12" @click="saveTopicName">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
      activator: String
    },
    data() {
        return {
            topicName: '',
            isOpen: false,
            editingTopic: {},
            loading: false
        }
    },
    methods: {
      ...mapActions("adminModule", ["editTopics"]),
      open(param) {
          this.editingTopic = param
          this.topicName = param.name
          this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      },
      async saveTopicName() {
        if (this.editingTopic.name !== this.topicName) {
          this.loading = true
          const param = {
            name: this.topicName,
            id: this.editingTopic.id
          }
          const resp = await this.editTopics(param)
          this.$emit("editTopic",resp);
        }
        this.loading = false
        this.close()
      }
    }
}
</script>