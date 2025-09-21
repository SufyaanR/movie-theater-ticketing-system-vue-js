<template>
  <div class="component">
    <p>{{label}}</p>
      <div class="buttons">
        <PrimaryButton button-text="Edit" :link="`/${domain}/edit/${id}`"/>
        <PrimaryButton style="background: crimson" data-bs-toggle="modal" data-bs-target="#dialogPopup">
          <i class="fa fa-trash"></i>
        </PrimaryButton>
        <DialogComponent @confirm="deleteObject(domain, id)" title="Deletion" :message="`Do you want to delete this ${domain}?`"/>
      </div>
  </div>
</template>
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import {
  deleteMovie,
} from "../routes/routes.js";
import DialogComponent from "./DialogComponent.vue";

defineProps({
  id: String,
  label: String,
  domain: String,
})

async function deleteObject(domain, id){
  switch (domain){
    case 'movie':
      await deleteMovie(id);
      break;
    case 'branch':
      //await deleteBranch(id);
      //alert('Delete successful');
      alert('In development');
      break;
    case 'theater':
      //await deleteTheater(id);
      //alert('Delete successful');
      alert('In development');
      break;
    case 'seat':
      //await deleteSeat(id);
      //alert('Delete successful');
      alert('In development');
      break;
    case 'admin':
      //await deleteAdmin(id);
      //alert('Delete successful');
      alert('In development');
      break;
    case 'customer':
      //await deleteCustomer(id);
      //alert('Delete successful');
      alert('In development');
      break;

  }
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