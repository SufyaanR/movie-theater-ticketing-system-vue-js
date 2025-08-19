<script setup>
import {useRoute} from "vue-router";
import {
  getMovieById,
  getAllBranches,
  getAllTheatersByBranchId,
  getAllSeatsByTheaterRoomId
} from "../routes/routes.js";
import {onBeforeMount, ref, watch, computed} from "vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import SecondaryTag from "../components/SecondaryTag.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import SeatComponent from "../components/SeatComponent.vue";

const route = useRoute(); //gets the route path

const movieId = route.params.id; // gets the id used as a param
const movie = ref();
const viewSummary= ref(false);

const branches = ref([]);
const selectedBranchId = ref("Choose a branch");
const defaultBranchText = ref("Choose a branch");
const displaySelectedBranch = ref();

const theaters = ref([]);
const selectedTheaterId = ref("Choose a theater");
const defaultTheaterText = ref("Choose a theater");

const seats = ref([]);
const seatsSelected = ref([]);

const selectedTicketQuantity = ref(null);
const exceedsTicketLimit = ref(false);

function toggleTicketSummary(){
  viewSummary.value = !viewSummary.value;
}

async function addSeatSelection(id) {
  const index = seatsSelected.value.indexOf(id);

  if (index === -1) {
    if (seatsSelected.value.length < selectedTicketQuantity.value) {
      seatsSelected.value.push(id);
    }
  }
  else {
    seatsSelected.value.splice(index, 1);
  }
}

function isSeatSelected(id){
  return seatsSelected.value.includes(id);
}

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

  for(let i=0; i < branches.value.length ; i++){
    if(selectedBranchId.value === branches.value[i].branchId){
      displaySelectedBranch.value = branches.value[i].location;
      return
    }
  }
})

watch(selectedTheaterId, async(newTheaterId)=>{
    selectedTicketQuantity.value = null;
    seats.value = await getAllSeatsByTheaterRoomId(newTheaterId);
})

watch(selectedTicketQuantity, async(ticketQuantity)=>{
    exceedsTicketLimit.value = false;

  if(ticketQuantity < 0){
    selectedTicketQuantity.value = null;
  }

  if (ticketQuantity > seats.value.length){
    exceedsTicketLimit.value = true;
  }

  //reset seat selection
  seatsSelected.value = [];
})
</script>

<template>
<div class="main">

  <div class="movie-details-container">
    <img v-if="movie.image" :src= movie.image>
    <img v-else src= '/src/assets/no-photo.jpg'>

    <!--MOVIE DETAILS-->
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

  <!--BOOK NOW-->
  <div class="book-now-container">
    <h1 style="margin: 40px;"><strong>Book Now</strong></h1>

    <!--FORM FIELDS-->
    <div class="form-fields">
    <!--BRANCH-->
    <div v-if="!viewSummary">
    <h6>Choose a branch
      <PrimaryTag v-if="selectedBranchId!==defaultBranchText" label="✓" />
    </h6>
    <select class="form-select" v-model="selectedBranchId">
      <option selected>{{ defaultBranchText }}</option>
      <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
    </select>
    </div>

    &nbsp;

    <!--THEATER ROOM-->
    <div v-if="selectedBranchId!==defaultBranchText && !viewSummary">
    <h6>Theater Room
      <PrimaryTag v-if="selectedTheaterId!==defaultTheaterText" label="✓" />
    </h6>

      <select class="form-select" v-model="selectedTheaterId">
      <option selected>{{ defaultTheaterText }}</option>
      <option v-for="theater in theaters" :key="theater.theaterRoomId" :value="theater.theaterRoomId">{{theater.theaterRoomId}}</option>
    </select>

      <p v-if="selectedTheaterId===defaultTheaterText && !viewSummary">No Theater Selected</p>
      <h1 v-else ><strong>RM{{ selectedTheaterId }}</strong></h1>
    </div>

    <!--TICKET QUANTITY-->
    <div v-if="selectedTheaterId!==defaultTheaterText && !viewSummary" class="mb-3">
      <label for="seatQuantity" class="form-label">
        Enter your ticket quantity
        <PrimaryTag v-if="selectedTicketQuantity" label="✓" />
      </label>
      <input v-model="selectedTicketQuantity" class="form-control" :class="{warningField: exceedsTicketLimit}" type="number" id="seatQuantity" placeholder="E.g 1">
      <label for="seatQuantity" class="form-label warning" v-if="exceedsTicketLimit">{{seats.length}} seats available</label>
    </div>

    <div v-if="selectedTicketQuantity && !viewSummary && !exceedsTicketLimit" class="seats">
      <h6>
        Select {{ selectedTicketQuantity }} seat(s)
        <PrimaryTag v-if="seatsSelected.length===selectedTicketQuantity" label="✓" />
      </h6>

    <div class="seat-container">
    <SeatComponent v-for="seat in seats" :key="seat.seatId" :label="seat.seatId" :isSelected="isSeatSelected(seat.seatId)" @click="addSeatSelection(seat.seatId)" />
    </div>
    </div>

    <!--TICKET SUMMARY-->
    <div class="accordion" id="ticketSummary" >
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="toggleTicketSummary()">
            Ticket Summary
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#ticketSummary">
          <div class="accordion-body">
            <img style="height: 100px; aspect-ratio: 1/1.3; border-radius: 0;" v-if="movie.image" :src= movie.image>
            <img style="height: 100px; aspect-ratio: 1/1.3; border-radius: 0;" v-else src= '/src/assets/no-photo.jpg'>

            <h3><strong>{{movie.title}}</strong></h3>

            <p v-if="selectedBranchId!==defaultBranchText">
              <strong>Branch</strong>: {{ displaySelectedBranch }}
            </p>

            <p v-if="selectedTheaterId!==defaultTheaterText">
              <strong>Theater</strong>: RM{{ selectedTheaterId }}
            </p>

            <p v-if="selectedTicketQuantity">
              <strong>Quantity</strong>: {{ selectedTicketQuantity }}
            </p>

            <p v-if="seatsSelected.length">
              <strong>Selected seats</strong>: {{ seatsSelected }}
            </p>
          </div>

          <div v-if="selectedTicketQuantity">
            <h5><strong>Total:</strong></h5>
            <p><strong>R{{selectedTicketQuantity * movie.price}}</strong> @ <strong>R{{movie.price}}</strong> per ticket</p>
          </div>
        </div>
      </div>
    </div>
    </div>




  </div>

  <div v-if="seatsSelected.length === selectedTicketQuantity" class="checkout-container">
    <div class="total-price">
      <h5 v-if="selectedTicketQuantity">
        <strong>
          Total: R{{selectedTicketQuantity * movie.price}}
        </strong>
      </h5>
      <p v-if="selectedTicketQuantity">{{selectedTicketQuantity}} ticket(s)</p>
    </div>

    <PrimaryButton v-if="!viewSummary" class="checkout-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="toggleTicketSummary()" button-text="Confirm"/>
    <PrimaryButton v-else class="checkout-button" button-text="Checkout"/>
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
  min-width: 500px;
  margin-bottom: 50px;
}

.form-fields{
  display: flex;
  flex-direction: column;
  align-items: center;
  aspect-ratio: 1/1.3;
  background: #141414;
  border-radius: 25px;
  min-width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}

.checkout-container{
  color: #141414;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 100px;
  background: #00FF7F;
  position: fixed;
  bottom: 20px;
  right: 10px;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  opacity: 90%;
}

.total-price{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.seat-container{
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 400px;
}

.accordion{
  width:320px;
}

.accordion button{
  color: white;
  background: #141414;
}

.accordion-body p{
  text-align: left;
}

select{
  width: 320px;
}

input{
  width: 320px;
}

.warning{
  color: crimson;
}

.warningField{
  border: 1px solid crimson !important;
}

button:focus{
  border: 1px solid #00FF7F !important;
}
</style>