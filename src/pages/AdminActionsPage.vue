<template>
  <div class="main">
    <h1>
      <strong>
        {{ domain.charAt(0).toUpperCase() + domain.slice(1) }}:
      </strong>
      CRUD
    </h1>

    <p v-if="!objects.length">No results</p>
    <p v-else>{{objects.length}} results</p>

    <AdminActionsComponent v-if="domain==='movie'" :domain="domain" :id="object.movieId" v-for="(object, index) in objects" :label="object.title" :key="index"/>
    <AdminActionsComponent v-if="domain==='branch'" :domain="domain" :id="object.branchId" v-for="(object, index) in objects" :label="object.location" :key="index"/>
    <AdminActionsComponent v-if="domain==='theater'" :domain="domain" :id="object.theaterRoomId" v-for="(object, index) in objects" :label="`Theater Room #${object.theaterRoomId}: RM${object.roomNumber} ${object.branch.location}`" :key="index"/>
    <AdminActionsComponent v-if="domain==='seat'" :domain="domain" :id="object.seatId" v-for="(object, index) in objects" :label="`Seat #${object.seatId}: ${object.seatNumber} @ RM${object.theaterRoom.roomNumber} ${object.theaterRoom.branch.location}`" :key="index"/>
    <AdminActionsComponent v-if="domain==='admin'" :domain="domain" :id="object.userId" v-for="(object, index) in objects" :label="object.username" :key="index"/>
    <AdminActionsComponent v-if="domain==='customer'" :domain="domain" :id="object.userId" v-for="(object, index) in objects" :label="object.username" :key="index"/>


    <div v-if="!objects.length" id="loading-overlay">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <AdminControlsComponent :button-text="`Add A ${domain.charAt(0).toUpperCase() + domain.slice(1)}`" :button-link="`/${domain}/create`"/>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import AdminActionsComponent from "../components/AdminActionsComponent.vue";
import {onBeforeMount, ref} from "vue";
import {
  getAllAdmins,
  getAllBranches,
  getAllCustomers,
  getAllMovies,
  getAllSeats,
  getAllTheaters
} from "../routes/routes.js";
import AdminControlsComponent from "../components/AdminControlsComponent.vue";
const route = useRoute();
const domain = route.params.id;

let objects = ref([]);

onBeforeMount(async()=>{
  switch (domain){
    case 'movie':
      objects.value = await getAllMovies();
      break;
    case 'branch':
      objects.value = await getAllBranches();
      break;
    case 'theater':
      objects.value = await getAllTheaters();
      break;
    case 'seat':
      objects.value = await getAllSeats();
      break;
    case 'admin':
      objects.value = await getAllAdmins();
      break;
    case 'customer':
      objects.value = await getAllCustomers();
      break;

  }
}
)
</script>
<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>