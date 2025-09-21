<template>
  <div class="main">
    <div class="form mb-5">
        <h1><strong>Select A Branch</strong></h1>
      <select class="form-select" v-model="selectedBranchId">
        <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
      </select>
    </div>

    <div class="form" v-if="selectedBranchId">
      <h1>
        <strong>
          Create Theater
        </strong>
      </h1>

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

      <PrimaryButton v-if="roomCapacity" :button-text="'Create RM' + roomNumber " @click="onSubmit()"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {createTheater, getAllBranches, getBranchById} from "../routes/routes";
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const branches = ref([]);

const selectedBranchId = ref();

const roomNumber = ref();
const roomCapacity = ref();
const is3DSupported = ref(false);

onBeforeMount( async()=>{
  branches.value = await getAllBranches();
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
    await createTheater(theater);
    alert("Theater created successfully");
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