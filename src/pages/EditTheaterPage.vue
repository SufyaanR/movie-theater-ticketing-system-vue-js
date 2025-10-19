<template>
  <div class="main">
    <div class="form mb-5">

    </div>

    <div class="form">
      <h1>
        <strong>Edit Theater</strong>: RM{{roomNumber}}
      </h1>

      <label for="branchId" class="form-label">
        Select A Branch
      </label>
      <select class="form-select" v-model="selectedBranchId">
        <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
      </select>

      <label for="roomNumber" class="form-label">
        Enter the room number
      </label>
      <input class="form-control" v-model="roomNumber" :class="{warningField: null}" id="roomNumber" type="number" placeholder="E.g RM12">

      <label for="roomCapacity" class="form-label">
        Enter the room capacity
      </label>
      <input class="form-control" v-model="roomCapacity" :class="{warningField: null}" id="roomCapacity" type="number" placeholder="E.g 50">

      <label class="form-label">
        Type of theater
      </label>
      <div class="radio-buttons">
        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="2D"
              :value="false"
              v-model="is3DSupported"
          />
          <label class="form-check-label" for="list"><PrimaryTag label="2D"/></label>
        </div>

        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="3D"
              value="3D"
              v-model="is3DSupported"
          />
          <label class="form-check-label" for="grid"><PrimaryTag label="3D"/></label>
        </div>
      </div>

      <PrimaryButton :button-text="'Update RM' + roomNumber " @click="onSubmit()"/>
    </div>
      <SecondaryButton button-text="Cancel" @click="router.back()"/>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {createTheater, getAllBranches, getBranchById, getTheaterById, updateTheater} from "../routes/routes";
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import {useRoute, useRouter} from "vue-router";
import SecondaryButton from "../components/SecondaryButton.vue";

const router = useRouter();
const route = useRoute();
const theaterId = route.params.id;

const theater = ref();
const branches = ref([]);

const selectedBranchId = ref();

const roomNumber = ref();
const roomCapacity = ref();
const is3DSupported = ref(false);

onBeforeMount( async()=>{
  branches.value = await getAllBranches();

  theater.value = await getTheaterById(theaterId);
  roomNumber.value = theater.value.roomNumber;
  roomCapacity.value = theater.value.capacity;
  is3DSupported.value = theater.value.is3DSupported;
  selectedBranchId.value = theater.value.branch.branchId;
  console.log(selectedBranchId.value);
})

async function onSubmit() {
  const branch = await getBranchById(selectedBranchId.value);
  const theater = {
    roomNumber: roomNumber.value,
    capacity: roomCapacity.value,
    is3DSupported: is3DSupported.value,
    branch: { branchId: selectedBranchId.value,
              location: branch.location,
              numberOfTheaterRooms: branch.numberOfTheaterRooms}
  };

  try {
    await updateTheater(theater);
    alert("Theater updated successfully");
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

.radio-buttons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

</style>