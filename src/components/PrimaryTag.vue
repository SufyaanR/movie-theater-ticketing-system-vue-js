<template>
  <span class="badge text-bg-secondary">
    <p>{{ label }}</p>
    <slot/>
  </span>
</template>
<script setup>
defineProps({
  label:String,
})
</script>

<style scoped>
.badge{
  color: #141414 !important;
  background: #00FF7F !important;
  min-width: 40px;
  height: 20px;
  margin: 2px;
}

p{
  font-weight: bolder;
}
</style>
