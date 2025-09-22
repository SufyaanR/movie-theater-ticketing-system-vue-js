<template>
  <div class="main">
    <div class="form mb-5">
      <h1><strong>Select A Branch</strong></h1>
      <select class="form-select" v-model="selectedBranchId">
        <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
      </select>
    </div>

    <div class="form mb-5" v-if="selectedBranchId">
      <h1><strong>Select A Theater</strong></h1>
      <select class="form-select" v-model="selectedTheaterId">
        <option v-for="theater in theaters" :key="theater.theaterRoomId" :value="theater.theaterRoomId">RM{{theater.roomNumber}}</option>
      </select>
    </div>

    <div class="form mb-3" v-if="selectedTheaterId">
      <h1><strong>Create A Seat</strong></h1>

      <label for="seatNumber" class="form-label">
        Enter the seat number
      </label>
      <input class="form-control" v-model="seatNumber" :class="{warningField: null}" id="seatNumber" placeholder="E.g 1">

    </div>

      <PrimaryButton v-if="seatNumber" :button-text="'Save seat #' + seatNumber" @click="onSubmit()"/>
      <SecondaryButton v-else button-text="Cancel" @click="router.back()"/>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import {createSeat, getAllBranches, getAllTheatersByBranchId, getBranchById, getTheaterById} from "../routes/routes";
import router from "../router";
import SecondaryButton from "../components/SecondaryButton.vue";

const branches = ref();

const theaters = ref();

const seatNumber = ref();

const selectedBranchId = ref();
const selectedTheaterId = ref();

onBeforeMount( async()=>{
  branches.value = await getAllBranches();
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
    await createSeat(seat);
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