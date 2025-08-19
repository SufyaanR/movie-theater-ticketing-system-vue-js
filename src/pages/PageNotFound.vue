<template>
  <div class="main-container">
  <h1>
    <strong>
    404
    </strong>
  </h1>
  <p>Page Not Found</p>
    <PrimaryButton button-text="Go To 'Browse Movies'" link="/movies"/>
    <p style="font-size: 18px; width: 500px;">
      If you're part of the ADP3 Capstone team, attempting to navigate to a page.
      Please add it to the 'src/router/index.js'.
      Follow the way it's done in the file.
    </p>
  </div>
</template>
<style scoped>
.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  height: 82vh;
}

.main-container h1{
  font-size: 500px;
}
</style>
<script setup lang="ts">
import PrimaryButton from "../components/PrimaryButton.vue";
</script>