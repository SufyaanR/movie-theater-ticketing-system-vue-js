<script setup>
defineProps({
    buttonText: String,
  link: String
})
</script>

<template>
  <a :href= link class="btn btn-primary">{{ buttonText }} <slot/></a>
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