<script setup>
import router from "../router/index.js";

defineProps({
    buttonText: String,
    link: String
})
</script>

<template>
  <a v-if="link" @click="router.push(link)" class="btn btn-primary">{{ buttonText }} <slot/></a>
  <a v-else class="btn btn-primary">{{ buttonText }} <slot/></a>
</template>

<style scoped>
.btn{
  color: white;
  background: #282828;
  font-weight: bolder;
  border: 2px solid transparent;
  transition: ease-in-out 0.3s;
  margin: 5px;
}

.btn:hover{
  color: #141414;
  background: #00FF7F;
}
</style>