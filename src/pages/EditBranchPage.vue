<template>
  <div class="main">
    <div class="form">
      <h1><strong>Edit Branch</strong>: {{branchLocation}}</h1>

      <label for="branchLocation" class="form-label">
        Enter the location
      </label>
      <input class="form-control" v-model="branchLocation" :class="{warningField: null}" id="branchLocation" placeholder="E.g Blue Route">

      <label for="theaterRooms" class="form-label">
        Enter the amount of theater rooms
      </label>
      <input class="form-control mb-3" v-model="theaterRooms" :class="{warningField: null}" type="number" id="theaterRooms" placeholder="E.g 5">

      <PrimaryButton v-if="branchLocation" :button-text="'Update ' + branchLocation" @click="onSubmit()" />
      <SecondaryButton v-else button-text="Cancel" @click="router.back()"/>
  </div>

  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";
import {createBranch, getBranchById, updateBranch} from "../routes/routes";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const branchId = route.params.id
const branch = ref();
const branchLocation = ref();
const theaterRooms = ref();

onBeforeMount(async ()=>{
  branch.value = await getBranchById(branchId);
  branchLocation.value = branch.value.location;
  theaterRooms.value = branch.value.numberOfTheaterRooms;
})

async function onSubmit(){
  const branch = {
    branchId: branchId,
    location: branchLocation.value,
    numberOfTheaterRooms: theaterRooms.value,
  }

  try {
    await updateBranch(branch);
    alert("Branch successfully updated");
    router.back();
  }
  catch(err){
    console.error("Failed to create branch:", err);
    alert("Failed to create branch: " + err.message);
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