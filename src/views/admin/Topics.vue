<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="top" :color="color">
      {{ text }}
    </v-snackbar>
    <v-card class="py-2 px-4">
      <v-card-title>Any Topic ?<v-icon @click="showLove" color="red" medium class="ml-2">mdi-heart</v-icon></v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="title" outlined placeholder="Topic name"></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
          :headers="headers"
          :items="dataTopics"
          :sort-desc="true"
          sort-by="name"
          :loading="loading"
           no-data-text="No Data">
           <template v-slot:[`item.action`]="{ item }">
              <v-btn class="float-right ml-2" @click="editTopicModal(item)" icon>
                <v-icon size="20" class="mr-2"> mdi-pencil </v-icon>Edit</v-btn>
              <v-btn class="mr-16 float-right" @click="deleteConfirmModal(item)" icon>
                <v-icon size="20" class="mr-2"> mdi-delete </v-icon>Delete</v-btn>
            </template>
          </v-data-table>
      <v-card-actions>
        <v-btn :loading="loading" @click="saveTopic"
          ><v-icon small class="mr-2"> mdi-content-save </v-icon>Save</v-btn
        >
      </v-card-actions>
    </v-card>
    <EditModal @editTopic="editTopic" ref="editTopicNameModal"/>
    <remove-prompt-modal @remove="removeTopic" ref="removeModal"/>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import EditModal from "@/components/EditModal.vue";
import RemovePromptModal from "@/components/RemovePromptModal";

export default {
  components: {
    EditModal,
    RemovePromptModal
  },
  data() {
    return {
      title: "",
      snackbar: false,
      top: "top",
      color: "error",
      timeout: 3000,
      loading: false,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Created At", value: "created", sortable: true },
        { value: "action", sortable: false }
      ],
      deletingTopic: {}
    };
  },
  async mounted() {
    await this.getTopics();
  },
  computed: {
    ...mapState("loginModule", {text: (state) => state.handleMessage}),
    ...mapState("adminModule", {topics: (state) => state.topics}),
    dataTopics() {
        let items = []
        if (this.topics && this.topics.length) {
            this.topics.forEach(topic => {
                let obj = {}
                obj.name = topic.name
                obj.id = topic.id
                obj.created = topic.created.substring(0, 10);
                items.push(obj)
            }); 
        }
        return items
    }
  },
  methods: {
    ...mapActions("adminModule", ["addTopics", "getTopics", "deleteTopic"]),
    ...mapMutations("loginModule", ["handleMessage"]),
    async saveTopic() {
      this.loading = true;
      const payload = {
        name: this.title,
        created: new Date().toISOString(),
      };
      const res = await this.addTopics(payload);
      if (res.success) {
        this.showMessage("Topic Added");
        this.title = "";
      } else {
        this.showMessage(res.msg);
      }
      this.loading = false;
    },
    editTopicModal(param) {
        this.$refs.editTopicNameModal.open(param)
    },
    async editTopic(res) {
      if (res.success) {
        this.showMessage("Topic Edited");
        await this.getTopics();
      } else {
        this.showMessage(res.msg);
      }
    },
    deleteConfirmModal(param) {
        this.deletingTopic = param
        this.$refs.removeModal.open()
    },
    async removeTopic() {
      this.loading = true;
      const res = await this.deleteTopic(this.deletingTopic.id);
      if (res.success) {
        this.showMessage("Topic Deleted");
        this.title = "";
      } else {
        this.showMessage(res.msg);
      }
      this.loading = false;
    },
    showMessage(msg) {
      this.handleMessage(msg);
      this.snackbar = true;
    },
    showLove() {
      this.showMessage("Love you leena");
    }
  },
};
</script>