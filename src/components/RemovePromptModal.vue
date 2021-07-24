<template>
  <v-dialog v-model="isOpen" persistent :activator="activator" max-width="500">
    <v-card>
      <v-card-title>{{ headerText }}</v-card-title>
      <v-card-text class="pt-0 notice">{{ bodyText }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          large
          @click="cancel"
          :class="$vuetify.breakpoint.xs ? ' px-4' : 'px-12'"
        >
          Go Back
        </v-btn>
        <v-btn
          dark
          depressed
          large
          color="error"
          @click="removeItem"
          :loading="isLoading"
          :class="$vuetify.breakpoint.xs ? ' px-4' : 'px-12'"
        >
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    activator: String,
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      headerText: "Delete this item?",
      bodyText: "This action cannot be undone."
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    cancel() {
      this.isOpen = false;
    },
    removeItem() {
      this.$emit("remove");
      this.cancel()
    }
  }
};
</script>
