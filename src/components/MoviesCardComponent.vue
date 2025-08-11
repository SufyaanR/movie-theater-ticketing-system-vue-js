<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryTag from './PrimaryTag.vue';
import router from "../router/index.js";

``
defineProps({
  id: String,
  title: String,
  description: String,
  imagePath: String,
  genre: String,
  ageRestriction: String,
  viewType: String,
})

function redirect(id){
  router.push(`/movie/${id}`);
}
</script>

<template>
  <div class="card" style="width: 18rem;">

    <img v-if="imagePath" :src="imagePath" class="card-img-top" alt="...">
    <img v-else src="/src/assets/no-photo.jpg" class="card-img-top" alt="...">

    <div class="card-body">
      <div class="my-card-header">
        <h5 class="card-title">{{ title }}</h5>&nbsp;
        <PrimaryTag v-if="viewType==='3D'" :label="viewType"/>
      </div>
      <p>{{ genre }}</p>
      <PrimaryButton buttonText="View Now" @click="redirect(id)"/>
    </div>
  </div>
</template>

<style scoped>
.card{
  background: #141414;
}

.card-title{
  font-weight: bolder;
}

.my-card-header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

img{
  aspect-ratio: 2/3;
}
</style>