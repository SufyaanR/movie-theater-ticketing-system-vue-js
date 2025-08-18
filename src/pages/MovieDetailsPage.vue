<script setup>
import {useRoute} from "vue-router";
import {getMovieById, getAllBranches, getAllTheatersByBranchId} from "../routes/routes.js";
import {onBeforeMount, ref, watch, computed} from "vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import SecondaryTag from "../components/SecondaryTag.vue";
import PrimaryButton from "../components/PrimaryButton.vue";

const route = useRoute(); //gets the route path

const movieId = route.params.id; // gets the id used as a param
const movie = ref();

const branches = ref([]);
const selectedBranchId = ref("Choose a branch");
const defaultBranchText = ref("Choose a branch");

const theaters = ref([]);
const selectedTheaterId = ref("Choose a theater");
const defaultTheaterText = ref("Choose a theater");

const selectedTicketQuantity = ref();

//makes a request on load
onBeforeMount(async() => {
   movie.value = await getMovieById(movieId);
   branches.value = await getAllBranches();
});

watch(selectedBranchId, async (newBranchId) => {

  if (!newBranchId) {
    theaters.value = []
    return
  }

  selectedTheaterId.value = defaultTheaterText.value;
  theaters.value = await getAllTheatersByBranchId(newBranchId)
})

</script>

<template>
<div class="main">

  <div class="movie-details-container">
    <img v-if="movie.image" :src= movie.image>
    <img v-else src= '/src/assets/no-photo.jpg'>
    <div class="movie-details">
      <h1><strong>{{ movie.title }}</strong></h1>

      <PrimaryTag v-if="movie.viewType==='3D'" :label="movie.viewType"/>
      <SecondaryTag v-if="movie.genre" :label="movie.genre"/>

      <p>{{ movie.description }}</p>

      <div v-if="movie.price" class="movie-details-pricing">
      <h1><strong>R{{ movie.price }}</strong></h1>
        &nbsp;
      <p> per ticket</p>
      </div>
    </div>
  </div>

  <div class="book-now-container">
    <h1><strong>Book Now</strong></h1>
    <div>
    <h6>Choose a branch
      <PrimaryTag v-if="selectedBranchId!==defaultBranchText" label="✓" />
    </h6>
    <select class="form-select" v-model="selectedBranchId">
      <option selected>{{ defaultBranchText }}</option>
      <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
    </select>
    </div>

    &nbsp;

    <div v-if="selectedBranchId!==defaultBranchText">
    <h6>Theater Room
      <PrimaryTag v-if="selectedTheaterId!==defaultTheaterText" label="✓" />
    </h6>

      <select class="form-select" v-model="selectedTheaterId">
      <option selected>{{ defaultTheaterText }}</option>
      <option v-for="theater in theaters" :key="theater.theaterRoomId" :value="theater.theaterRoomId">{{theater.theaterRoomId}}</option>
    </select>

      <p v-if="selectedTheaterId===defaultTheaterText">No Theater Selected</p>
      <h1 v-else ><strong>RM{{ selectedTheaterId }}</strong></h1>
    </div>

    <div v-if="selectedTheaterId!==defaultTheaterText" class="mb-3">
      <label for="seatQuantity" class="form-label">Enter your ticket quantity</label>
      <input v-model="selectedTicketQuantity" class="form-control" type="number" id="seatQuantity" placeholder="E.g 1">
    </div>

    <div class="accordion" id="ticketSummary" style="z-index: 10;">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Ticket Summary
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#ticketSummary">
          <div class="accordion-body">
            <img style="height: 100px; aspect-ratio: 1/1.3; border-radius: 0;" v-if="movie.image" :src= movie.image>
            <img style="height: 100px; aspect-ratio: 1/1.3; border-radius: 0;" v-else src= '/src/assets/no-photo.jpg'>
            <h3><strong>{{movie.title}}</strong></h3>
            <p v-if="selectedBranchId!==defaultBranchText">Branch: {{ selectedBranchId }}</p>
            <p v-if="selectedTheaterId!==defaultTheaterText">Theater: RM{{ selectedTheaterId }}</p>
            <p v-if="selectedTicketQuantity">Quantity: {{ selectedTicketQuantity }}</p>
          </div>
          <div v-if="selectedTicketQuantity">
            <h5><strong>Total:</strong></h5>
            <p><strong>R{{selectedTicketQuantity * movie.price}}</strong> @ <strong>R{{movie.price}}</strong> per ticket</p>
          </div>
        </div>
      </div>
    </div>

    <PrimaryButton class="checkout-button" button-text="Checkout"/>

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

.movie-details-pricing{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  bottom: 0;
  position: absolute;
}

.book-now-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  aspect-ratio: 1/1.3;
  background: #141414;
  border-radius: 25px;
  height: 650px;
  padding: 50px;
}

.checkout-button{
  bottom: 0;
  position: absolute;
  margin: 50px;
}
</style>