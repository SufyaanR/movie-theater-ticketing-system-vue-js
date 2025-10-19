<template>
  <div class="main">
    <div class="form mb-3">
      <h1><strong>Edit Seat</strong>: Seat {{seatNumber}}</h1>

      <label for="branchId" class="form-label">
        Select a branch
      </label>
      <select class="form-select mb-3" v-model="selectedBranchId">
        <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
      </select>

      <label for="theaterRoomId" class="form-label">
        Select a theater
      </label>
      <select class="form-select mb-3" v-model="selectedTheaterId">
        <option v-for="theater in theaters" :key="theater.theaterRoomId" :value="theater.theaterRoomId">RM{{theater.roomNumber}}</option>
      </select>


      <label for="seatNumber" class="form-label">
        Enter the seat number
      </label>
      <input class="form-control" v-model="seatNumber" :class="{warningField: null}" id="seatNumber" placeholder="E.g 1">

    </div>

      <PrimaryButton v-if="seatNumber" :button-text="'Update Seat #' + seatNumber" @click="onSubmit()"/>
      <SecondaryButton button-text="Cancel" @click="router.back()"/>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import {
  createSeat,
  getAllBranches,
  getAllTheatersByBranchId,
  getBranchById,
  getSeatById,
  getTheaterById, updateSeat
} from "../routes/routes";
import router from "../router";
import SecondaryButton from "../components/SecondaryButton.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const seatId = route.params.id;

const branches = ref();

const theaters = ref();

const seat = ref();
const seatNumber = ref();

const selectedBranchId = ref();
const selectedTheaterId = ref();

onBeforeMount( async()=>{
  branches.value = await getAllBranches();

  seat.value = await getSeatById(seatId);
  seatNumber.value = seat.value.seatNumber;
  selectedBranchId.value = seat.value.theaterRoom.branch.branchId;
  selectedTheaterId.value = seat.value.theaterRoom.theaterRoomId;
})

watch(selectedBranchId, async (newBranchId) => {

  if (!newBranchId) {
    theaters.value = []
    return
  }

  theaters.value = await getAllTheatersByBranchId(newBranchId);
})

async function onSubmit() {
  const seat = {
    seatNumber: seatNumber.value,
    theaterRoom: { theaterRoomId: selectedTheaterId.value },
    available: true,
  };

  try {
    await updateSeat(seat);
    alert("Seat created successfully");
    router.back();
  } catch (e) {
    console.log(e);
  }
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form{
  width: 40vw;
}
</style>