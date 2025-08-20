<script setup lang="ts">
import {ref} from "vue";
import MoviesCardComponent from "../components/MoviesCardComponent.vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import AdminControlsComponent from "../components/AdminControlsComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";

const movieTitle = ref();
const movieGenre = ref();
const movieImage = ref();
const movieDescription = ref();
const ageRestriction = ref();
const viewType = ref();

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    movieImage.value = URL.createObjectURL(file);
  }
}
</script>

<template>
  <div class="main">
    <div class="main-container">


      <div class="form">
        <h1 v-if="!movieTitle"><strong>Create Movie</strong></h1>
        <h1 v-else><strong>Create Movie</strong>: {{movieTitle}}</h1>

        <label for="movieTitle" class="form-label">
          Enter the title
        </label>
        <input class="form-control" v-model="movieTitle" :class="{warningField: null}" id="movieTitle" placeholder="E.g Jurassic Park">

        <label for="movieGenre" class="form-label">
          Enter the genre
        </label>
        <input class="form-control" v-model="movieGenre" :class="{warningField: null}" id="movieGenre" placeholder="E.g Comedy">

        <label for="movieDuration" class="form-label">
          Movie duration
        </label>
        <input class="form-control" :class="{warningField: null}" id="movieDuration" type="number" placeholder="E.g 90 mins">

        <label for="movieDescription" class="form-label">
          Enter the description
        </label>
        <textarea class="form-control" :class="{warningField: null}" v-model="movieDescription" id="movieDescription" placeholder="E.g When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."/>

        <label for="ageRestriction" class="form-label">
          Age restriction
        </label>
        <input class="form-control" :class="{warningField: null}" v-model="ageRestriction" id="ageRestriction" type="number" placeholder="E.g 18">

        <label class="form-label">Select the view type</label>

        <div class="radio-buttons">
        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="2D"
              value="2D"
              v-model="viewType"
          />
          <label class="form-check-label" for="list"><PrimaryTag label="2D"/></label>
        </div>

        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="3D"
              value="3D"
              v-model="viewType"
          />
          <label class="form-check-label" for="grid"><PrimaryTag label="3D"/></label>
        </div>
        </div>

      </div>

      <div class="form">
        <img v-if="movieImage" :src="movieImage" />
        <img v-else src="/src/assets/no-photo.jpg" />

        <label for="movieImage" class="form-label">
          Select an image
        </label>
        <input
            class="form-control"
            :class="{ warningField: null }"
            id="movieImage"
            type="file"
            accept="image/png, image/jpeg"
            @change="onFileChange"
            placeholder="Select the cover image"
        />
      </div>

      <div class="preview">
        <h3><strong>Preview</strong></h3>
      <MoviesCardComponent
          :image-path="movieImage"
          :title="movieTitle"
          :genre="movieGenre"
          :view-type="viewType"
          :disable-button="true"
      />
  </div>
  </div>
    <PrimaryButton v-if="movieTitle" :button-text="'Create ' + movieTitle"/>
  </div>
</template>
<style scoped>
.main-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 50px;
}

.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: left !important;
  width: 500px;
}

.radio-buttons{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

img{
  aspect-ratio: 2/3 !important;
  width: 300px !important;
  border-radius: 25px;
}
</style>
