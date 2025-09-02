<script setup>
import * as api from "../routes/routes.js";
import { ref, onMounted } from "vue";

const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  cellphoneNumber: "",
  profilePic: null,
  dateOfBirth: "",
});

async function loadUserProfile() {
  const savedUserId = localStorage.getItem("userId") ; // fallback for demo
  console.log("Loaded userId from localStorage:", savedUserId);

  try {
    const data = await api.getCustomerDetails(savedUserId);
    user.value = data;
    console.log("Loaded userData:", user.value);
  } catch (err) {
    console.error("Failed to fetch user data:", err);
  }
}

onMounted(() => {
  loadUserProfile();
});
</script>

<template>
  <div class="card p-5 shadow-lg mx-auto" style="max-width: 1400px; min-height: 480px; font-size: 1rem;">
    <div class="row align-items-start">
      <!-- Profile Picture Section (Left Side) -->
      <div class="col-auto text-center" style="min-width:200px; margin-right: 30px;">
        <img
            v-if="user.profilePic"
            :src="user.profilePic"
            class="rounded-circle mb-3"
            alt="Profile"
            width="180"
            height="180"
            style="object-fit:cover;"
        />
        <div
            v-else
            class="d-flex align-items-center justify-content-center rounded-circle bg-light mb-3"
            style="width:180px; height:180px; font-size:4rem;"
        >
          <i class="bi bi-person"></i>
        </div>
        <h4 class="mb-3" style="font-size:1.2rem;">{{ user.firstName }} {{ user.lastName }}</h4>
        <button class="btn btn-success px-4 py-2" style="font-size:1rem;" @click="$router.push('/profile/edit')">
          Edit Profile
        </button>
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
  </div>
</template>