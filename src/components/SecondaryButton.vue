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
  color: #141414;
  background: white;
  font-weight: bolder;
  border: 2px solid transparent;
  transition: ease-in-out 0.3s;
  margin: 5px;
}

.btn:hover{
  background: #D5D5D5;
  border: 2px solid #00FF7F;
}
</style>