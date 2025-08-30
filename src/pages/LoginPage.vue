<script setup>
import LoginComponent from "../components/LoginComponent.vue";
import SignUpComponent from "../components/SignUpComponent.vue";

defineProps({
  isUserLoggedIn: Boolean,
})

</script>
<template>
  <LoginComponent />
</template>
<style scoped>
</style>