<script setup>
import LoginComponent from "../components/LoginComponent.vue";
import SignUpComponent from "../components/SignUpComponent.vue";

defineProps({
  isUserLoggedIn: Boolean,
})

</script>
<template>
  <LoginComponent v-if="isUserLoggedIn" />
  <SignUpComponent v-else />
</template>
<style scoped>
</style>