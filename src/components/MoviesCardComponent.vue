<script setup>
defineProps({
  id: String,
  title: String,
  description: String,
  imagePath: String,
  genre: String,
  ageRestriction: String,
})

</script>

<template>
  <div class="card">
    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
    <h2>{{ title }}</h2>
    <img :src="imagePath" />
    </div>
    <h4>ID: {{ id }}</h4>
    <p>Genre: {{ genre }}</p>
    <p>Description: {{ description }}</p>
    <p>Age Restriction: <h2>{{ ageRestriction }}</h2></p>
      <button>View Now</button>
  </div>
</template>

<style>
.card {
  color: black;
  aspect-ratio: 1/1;
  min-height: 375px;
  background-color: aliceblue;
  border-radius: 50px;
  border: 5px solid transparent;
  margin: 10px;
  transition: ease-in-out 0.2s;
}

.card:hover {
  color: white;
  background-color: #213547;
  border: 5px solid white;
}

img {
  align-self: center;
  width: 25px;
  aspect-ratio: 1/1;
}

button {
  border: 2px solid transparent;
}

button:hover {
  border: 2px solid #213547;
}
</style>