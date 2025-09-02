<script setup>
import LoginComponent from "../components/LoginComponent.vue";

defineProps({
  isUserLoggedIn: Boolean,
})

//alert("If you're trying to navigate to other pages, please populate your 'Admin' table in your db with users. Contact Lyle if you're struggling.");
</script>
<template>
  <LoginComponent />
</template>
<style scoped>
</style>


