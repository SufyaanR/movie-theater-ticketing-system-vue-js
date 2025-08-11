<script setup>
import {useRoute} from "vue-router";
import {getMovieById} from "../routes/routes.js";
import {onBeforeMount, ref} from "vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import SecondaryTag from "../components/SecondaryTag.vue";

const route = useRoute(); //gets the route path
const movieId = route.params.id; // gets the id used as a param
const movie = ref();

//makes a request on load
onBeforeMount(async() => {
   movie.value = await getMovieById(movieId);
});
</script>

<template>
<div class="main">

  <div class="movie-details-container">
    <img v-if="movie.image" :src= movie.image>
    <img v-else src= '/src/assets/no-photo.jpg'>
    <div class="movie-details">
      <h1><strong>{{ movie.title }}</strong></h1>
      <PrimaryTag v-if="movie.viewType==='3D'" :label="movie.viewType"/>
      <SecondaryTag :label="movie.genre"/>
      <p>{{ movie.description }}</p>
    </div>
  </div>

  <div class="book-now-container">

  </div>
</div>
</template>
<style scoped>
.main{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

img{
  aspect-ratio: 2/3;
  height: 650px;
  border-radius: 25px;
}
.movie-details-container{
  display: flex;
  flex-direction: row;
}

.movie-details{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 20px;
}

.book-now-container{
  aspect-ratio: 1/1.3;
  background: #141414;
  border-radius: 25px;
  height: 650px;
  padding: 20px;
}
</style>