<template>
  <div class="home">
    <button @click="SignOut">Sign Out</button>
  </div>
</template>

<script>
export default {
    methods: {
        SignOut() {
            console.log("Logout")
        }
    }
}
</script>