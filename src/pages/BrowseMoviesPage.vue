<script setup>
import { ref,onBeforeMount } from 'vue';
import MoviesCardComponent from '../components/MoviesCardComponent.vue';
import { getAllMovies } from "../routes/routes.js";

const movies = ref([]);

//Makes a request on the first load
onBeforeMount(async () => {
  movies.value = await getAllMovies();
});

</script>

<template>
  <div class="main">
  <div class="main-container">


    <div class="results-header">
      <h1>Movies</h1>
      <h3 v-if="!movies.length">No results</h3>
      <h3 v-else >{{movies.length}} results found</h3>
    </div>

    <div class="movies-container">
      <MoviesCardComponent v-for="(movie, index) in movies"
      :key="index"
      :title="movie.title"
      :description="movie.description"
      :id="movie.movieId"
      :genre="movie.genre"
      :age-restriction="movie.ageRestriction"
      :view-type="movie.viewType"/>
    </div>
  </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}

.results-header {
  background: transparent;
  padding: 10px;
  width: 250px;
  border-left: 10px solid #00FF7F;
}

.movies-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>