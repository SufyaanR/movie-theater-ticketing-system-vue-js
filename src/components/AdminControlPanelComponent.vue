<script setup>
defineProps({
  options: [],
  label: String,
})
</script>

<template>
  <div class="card p-5 shadow-lg mx-auto">
    <div>
      <h4>
        <strong>
          {{ label }}
        </strong>
      </h4>

      <p>
        <a v-for="option in options" :href="option.value">{{ option.label }}</a>
      </p>
    </div>
  </div>
</template>
<style scoped>
.card{
  width: 20vw !important;
  background: transparent;
  justify-content: flex-start;
}

p{
  display: flex;
  flex-direction: column;
}

a:hover{
  color: #00FF7F;
  font-weight: bold;
  transition: ease-in-out 0.2s;
}
</style>