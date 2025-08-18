<script setup>
defineProps({
  label: String,
})
</script>
<template>
  <div>
    <h3>
      <strong>
      {{ label }}
      </strong>
    </h3>
  </div>
</template>

<style scoped>
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    aspect-ratio: 1/1;
    height: 50px;
    background: #282828;
    transition: ease-in-out 0.25s;
    margin: 5px;
  }

  div:hover{
    color: #141414;
    background: #00FF7F;
  }
</style>