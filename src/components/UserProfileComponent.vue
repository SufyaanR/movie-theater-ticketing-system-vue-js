<script setup>
import {getAdminDetails, getCustomerDetails} from "../routes/routes.js";
import {ref, onBeforeMount} from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryTag from "./PrimaryTag.vue";
import SecondaryTag from "./SecondaryTag.vue";
import AdminControlPanelComponent from "./AdminControlPanelComponent.vue";

const user = ref({});
const isAdmin = ref(localStorage.getItem("isAdmin")==='true');

onBeforeMount(async () => {
  const savedUserId = localStorage.getItem("authenticatedUserId") ;

  if(!isAdmin.value) {
    user.value = await getCustomerDetails(savedUserId);
  }
  else{
    user.value = await getAdminDetails(savedUserId);
  }
});

const manageYourDataOptions = [
    {label: "Movies", value: "/movie"},
    {label: "Branches", value: "/branch"},
    {label: "Theaters", value: "/theater"},
    {label: "Seats", value: "/seat"},
];

const manageYourUsersOptions = [
    {label: "Customers", value: "/customer"},
    {label: "Administrators", value: "/admin"},
];

const manageBookingsOptions = [
    {label: "Tickets", value: "/ticket"},
    {label: "Schedule", value: "/schedule"},
];
</script>

<template>
  <div class="card p-5 shadow-lg mx-auto">
    <div class="mb-5">
    <h2>
      <strong>
        Profile:
      </strong>
      {{ user.username}}
    </h2>
      <PrimaryTag v-if="isAdmin" label="Admin"/>
      <SecondaryTag v-else label="Customer"/>
    </div>
    <div class="row align-items-start">
      <!-- Profile Picture Section (Left Side) -->
      <div class="col-auto text-center" style="min-width:200px; margin-right: 30px;">
        <img v-if="user.image"
             :src="'data:image/jpeg;base64,' + user.image"
             class="rounded-circle mb-3"
             alt="Profile"
             width="180"
             height="180"
             style="object-fit:cover;"
        />
        <img v-else
             src="../assets/no-profile-pic.jpg"
             class="rounded-circle mb-3"
             alt="Profile"
             width="180"
             height="180"
             style="object-fit:cover;"
        />
        <h4 class="mb-3" style="font-size:1.2rem;">{{ user.username }}</h4>
        <PrimaryButton button-text="Edit Profile" link="/profile/edit" />
      </div>

      <!-- User Details Section (Right Side) -->
      <div class="col">
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <h6 class="text-muted mb-2" style="font-size:0.9rem;">First Name</h6>
              <p class="mb-0" style="font-size:1.1rem; font-weight: 500;">{{ user.firstName || 'Not specified' }}</p>
            </div>
            <div class="mb-4">
              <h6 class="text-muted mb-2" style="font-size:0.9rem;">Date of Birth</h6>
              <p class="mb-0" style="font-size:1.1rem; font-weight: 500;">{{ user.dateOfBirth || 'Not specified' }}</p>
            </div>
            <div class="mb-4">
              <h6 class="text-muted mb-2" style="font-size:0.9rem;">Cellphone Number</h6>
              <p class="mb-0" style="font-size:1.1rem; font-weight: 500;">{{ user.cellphoneNumber|| 'Not specified' }}</p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <h6 class="text-muted mb-2" style="font-size:0.9rem;">Last Name</h6>
              <p class="mb-0" style="font-size:1.1rem; font-weight: 500;">{{ user.lastName || 'Not specified' }}</p>
            </div>
            <div class="mb-4">
              <h6 class="text-muted mb-2" style="font-size:0.9rem;">Email Address</h6>
              <p class="mb-0" style="font-size:1.1rem; font-weight: 500;">{{ user.email || 'Not specified' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isAdmin">
        <p>
          <strong>
            Administrative Controls:
          </strong>
        </p>

      <div class="admin-controls">
        <AdminControlPanelComponent label="Manage Your Data" :options="manageYourDataOptions"/>
        <AdminControlPanelComponent label="Manage Your Users" :options="manageYourUsersOptions"/>
        <AdminControlPanelComponent label="Manage Bookings" :options="manageBookingsOptions"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card{
  width: 80vw;
  background: transparent;
}

 .admin-controls{
  display: flex;
   flex-direction: row;
   gap: 10px;
 }
</style>