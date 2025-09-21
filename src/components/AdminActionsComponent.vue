<template>
  <div class="component">
    <p v-if="!disabledActions">{{label}}</p>
    <p v-else>
      <strong>
      {{label}}
      </strong>
      <PrimaryTag label="You"/>
    </p>
      <div class="buttons">
        <PrimaryButton v-if="!disabledActions" button-text="Edit" :link="`/${domain}/edit/${id}`"/>
        <PrimaryButton v-if="!disabledActions" style="background: crimson" data-bs-toggle="modal" :data-bs-target="`#dialog-${id}`">
          <i class="fa fa-trash"></i>
        </PrimaryButton>
        <PrimaryButton v-if="disabledActions" button-text="View Profile" link="/user-details"/>
        <DialogComponent :id="`dialog-${id}`" @confirm="deleteObject(id)" title="Deletion" :message="`Do you want to delete this ${domain}: ${label}?`" primary-text="Delete" secondary-text="Cancel"/>
      </div>
  </div>
</template>
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import {
  deleteAdmin,
  deleteBranch, deleteCustomer,
  deleteMovie, deleteSeat, deleteTheater,
} from "../routes/routes.js";
import DialogComponent from "./DialogComponent.vue";
import {useRouter} from "vue-router";
import PrimaryTag from "./PrimaryTag.vue";

const router = useRouter();

const { id, label, domain } = defineProps({
  id: Number,
  label: String,
  domain: String,
  disabledActions: Boolean,
})


async function deleteObject(id){
  switch (domain){
    case 'movie':
      await deleteMovie(id);
      break;
    case 'branch':
      await deleteBranch(id);
      break;
    case 'theater':
      await deleteTheater(id);
      break;
    case 'seat':
      await deleteSeat(id);
      break;
    case 'admin':
      await deleteAdmin(id);
      break;
    case 'customer':
      await deleteCustomer(id);
      break;
  }
  router.replace({
    path: router.currentRoute.value.fullPath,
    query: { t: Date.now() }
  });
}
</script>
<style scoped>
 .component{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 80vw;
   height: auto;
   border: 1px solid #282828;
   padding: 10px;
 }

 p{
   text-align: left;
 }
</style>