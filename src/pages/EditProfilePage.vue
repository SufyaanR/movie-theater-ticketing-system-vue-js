<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import EditProfileForm from "../components/EditProfileForm.vue";

//Import your API helper (adjust path if needed)
import * as api from "../routes/routes.js";

const userData = ref({
  firstName: "",
  lastName: "",
  email: "",
  cellphoneNumber: "",
  profilePic: null,
  dateOfBirth: "",
});

const route = useRoute(); // reactive route object

// Load user profile from backend
async function loadUserProfile() {



  const userId = localStorage.getItem("userId") ; // fallback for demo
  try {
    userData.value = await api.getCustomerDetails(userId);
    console.log("Loaded userData:", userData.value);
  } catch (err) {
    console.error("Failed to fetch user data:", err);
  }
  // else {
  //  // Initialize with default data to ensure profile picture circle is always visible
  //  userData.value = {
  //    firstName: "",
  //    lastName: "",
  //    email: "",
  //    phone: "",
  //    profilePic: null,
  //    dateOfBirth: "",
  //  };

}

// Save user profile to backend
async function saveUserProfile(updatedUser) {
  try {
    const savedUser = await api.updateCustomer(updatedUser);
    userData.value = savedUser;

    // Store ID in localStorage (if needed later)
    if (savedUser.id) {
      localStorage.setItem("userId", savedUser.id);
    }

    console.log("Profile saved successfully:", savedUser);
  } catch (err) {
    console.error("Failed to save user profile:", err);
  }
}

// Lifecycle
onMounted(() => {
  loadUserProfile();
});

// Re-run when route changes
watch(
    () => route.fullPath,
    () => {
      loadUserProfile();
    }
);
</script>

<template>
  <div class="container-fluid mt-5 px-4">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <EditProfileForm
            :user="userData"
            :key="route.fullPath"
            @save="saveUserProfile"
        />
      </div>
    </div>
  </div>
</template>
