<template>
  <div class="main-container">
  <h1>
    <strong>
    404
    </strong>
  </h1>
  <p>Page Not Found</p>
    <PrimaryButton button-text="Back" @click="router.back()"/>
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
import {useRouter} from "vue-router";

const router = useRouter();
</script>