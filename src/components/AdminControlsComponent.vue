<template>
  <div class="admin-container">
    <PrimaryButton :button-text="buttonText" :link="buttonLink"/>
  </div>

</template>
<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";

defineProps({
  buttonText: String,
  buttonLink: String,
})
</script>

<style scoped>
.admin-container{
  color: #141414;
  background: #00FF7F;
  position: fixed;
  bottom: 20px;
  right: 10px;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  opacity: 90%;
}
</style>