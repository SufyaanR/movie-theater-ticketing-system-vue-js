<template>
  <div class="main">
    <div class="form">
      <h1 v-if="!branchLocation"><strong>Create Branch</strong></h1>
      <h1 v-else><strong>Create Branch</strong>: {{branchLocation}}</h1>

      <label for="branchLocation" class="form-label">
        Enter the location
      </label>
      <input class="form-control" v-model="branchLocation" :class="{warningField: null}" id="branchLocation" placeholder="E.g Blue Route">

      <label for="theaterRooms" class="form-label">
        Enter the amount of theater rooms
      </label>
      <input class="form-control" v-model="theaterRooms" :class="{warningField: null}" type="number" id="theaterRooms" placeholder="E.g 5">

      <PrimaryButton v-if="branchLocation" :button-text="'Create ' + branchLocation" @click="onSubmit()" />
      <SecondaryButton v-else button-text="Cancel" @click="router.back()"/>
  </div>

  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import SecondaryButton from "../components/SecondaryButton.vue";
import { createBranch } from "../routes/routes";
import {useRouter} from "vue-router";

const router = useRouter();

const branchLocation = ref();
const theaterRooms = ref();

async function onSubmit(){
  const branch = {
    location: branchLocation.value,
    numberOfTheaterRooms: theaterRooms.value,
  }

  try {
    await createBranch(branch);
    alert("Branch successfully created")
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