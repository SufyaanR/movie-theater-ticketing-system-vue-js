<script setup>
import {ref, onBeforeMount, watch, onMounted} from 'vue';
import MovieCardComponent from '../components/MovieCardComponent.vue';
import {getAllMovies, getAdminDetails, getCustomerDetails} from "../routes/routes.js";
import AdminControlsComponent from "../components/AdminControlsComponent.vue";

const movies = ref([]);
const filteredMovies = ref([]);
const searchQuery = ref("");
const selectedGenre = ref("");
const genres = ref(["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Sports", "Documentary", "Thriller", "Animation", "Fantasy", "Mystery", "Crime", "Adventure", "Musical"]);
const authenticatedUserId = localStorage.getItem("authenticatedUserId");
const user = ref();
const isAdmin = localStorage.getItem("isAdmin");

//Makes a request on the first load
onBeforeMount(async () => {
  if (isAdmin!=='true'){
    user.value = await getCustomerDetails(authenticatedUserId);
  }
  else {
    user.value = await getAdminDetails(authenticatedUserId);
  }
  movies.value = await getAllMovies();
  filteredMovies.value = movies.value;
});

//Search and Dropdown function
watch([searchQuery, selectedGenre], () => {
  filteredMovies.value = movies.value.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = selectedGenre.value ? movie.genre === selectedGenre.value : true;
    return matchesSearch && matchesGenre;
  });
});

</script>

<template>
  <div v-if="!movies.length" id="loading-overlay">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="main">
  <div class="main-container">

    <div class="results-header">
      <h1 v-if="!selectedGenre">Movies</h1>
      <h1 v-else>Movies: {{ selectedGenre }}</h1>

      <p v-if="!filteredMovies.length">No results</p>
      <p v-else >{{filteredMovies.length}} results found</p>
    </div>

    <div class="search-bar">
      <input
      type="text"
      class="form-control"
      v-model="searchQuery" 
      placeholder="Search Movies..." 
      />

      <select v-model="selectedGenre" class="form-select">
        <option value="">All Genres</option>
        <option v-for="(genre, index) in genres" :key="index" :value="genre">{{ genre }}</option>
      </select>
    </div>

    <div class="movies-container">
      <h1 v-if="!filteredMovies.length">No results</h1>
      <MovieCardComponent v-for="(movie, index) in filteredMovies"
      :key="index"
      :title="movie.title"
      :description="movie.description"
      :id="movie.movieId"
      :genre="movie.genre"
      :age-restriction="movie.ageRestriction"
      :view-type="movie.viewType"
      :image="movie.image"/>
    </div>
  </div>

    <AdminControlsComponent v-if="isAdmin==='true'" button-text="Add Movies" button-link="/movie/create"/>
  </div>
</template>

<style scoped>
#loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: #00FF7F;
}

.main-container {
  display: flex;
  flex-direction: column;
}

.results-header {
  background: transparent;
  padding: 10px;
  width: 150px;
  border-left: 10px solid #00FF7F;
}

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.search-bar {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.search-bar input[type="text"] {
  padding: 12px 40px;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.search-bar input[type="text"]:focus {
  border-color: #00FF7F;
  box-shadow: 0 0 5px rgba(0, 255, 127, 0.5);
  outline: none;
}

.search-bar select {
  padding: 12px 50px;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.search-bar select:focus {
  border-color: #00FF7F;
  box-shadow: 0 0 5px rgba(0, 255, 127, 0.5);
  outline: none;
}

input{
  width: 320px;
}

select{
  width: 320px;
}

</style>