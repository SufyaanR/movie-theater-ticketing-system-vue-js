<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  user: { type: Object, required: true },
});

const form = reactive({
  ...props.user,
  dateOfBirth: props.user.dateOfBirth || ""
});

// Watch for changes to props.user and update form
watch(
    () => props.user,
    (newUser) => {
      Object.assign(form, newUser);
    },
    { deep: true, immediate: true }
);

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      form.profilePic = e.target.result; // This stores the base64 data
    };
    reader.readAsDataURL(file); // Convert to base64
  }
}

function deleteProfilePic() {
  form.profilePic = null;
}

function openDatePicker() {
  // Trigger the date input to open
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.showPicker();
  }
}


import { ref } from "vue";
import * as api from "../routes/routes.js";
const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  cellphoneNumber: "",
  dateOfBirth: ""
});

function validateForm() {
  let valid = true;
  // First Name
  if (!form.firstName) {
    errors.firstName = "First name is required.";
    valid = false;
  } else {
    errors.firstName = "";
  }
  // Last Name
  if (!form.lastName) {
    errors.lastName = "Last name is required.";
    valid = false;
  } else {
    errors.lastName = "";
  }
  // Email
  if (!form.email) {
    errors.email = "Email is required.";
    valid = false;
  } else if (!form.email.includes("@")) {
    errors.email = "Email must contain '@'.";
    valid = false;
  } else {
    errors.email = "";
  }
  // Phone (only numbers and special characters)
  if (!form.cellphoneNumber) {
    errors.cellphoneNumber = "Contact number is required.";
    valid = false;
  } else if (!/^\d{10}$/.test(form.cellphoneNumber)) {
    errors.cellphoneNumber = "Contact number must be exactly 10 digits.";
    valid = false;
  }
  else {
    errors.cellphoneNumber = "";
  }
  // Date of Birth
  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
    valid = false;
  } else {
    errors.dateOfBirth = "";
  }
  return valid;
}
async function saveProfile() {
  if (!validateForm()) return;

  // Build the user object based on backend fields
  const userToUpdate = {
    userId: props.user.userId,          // keep original ID
    username: props.user.username,      // unchanged
    password: props.user.password,      // unchanged (unless you add a field for it)
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    address: props.user.address,        // unchanged
    cellphoneNumber: form.cellphoneNumber,
    gender: props.user.gender,          // unchanged
    dateOfBirth: form.dateOfBirth,
    cards: props.user.cards             // unchanged
  };

  try {
    await api.updateCustomer(userToUpdate);
    alert("Update Successful")// PUT/POST to backend
    router.push("/profile");
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Something went wrong while updating your profile.");
  }
}

</script>
<template>
  <form @submit.prevent="saveProfile" class="card p-5 shadow-lg mx-auto" style="max-width: 1400px; min-height: 480px; font-size: 1rem;">
    <div class="row align-items-start">
      <!-- Profile Picture Section (Left Side) -->
      <div class="col-auto text-center" style="min-width:200px; margin-right: 30px;">
        <img
            v-if="form.profilePic"
            :src="form.profilePic"
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
        <div class="mb-3">
          <input
              type="file"
              class="form-control form-control-sm"
              @change="onFileChange"
              accept="image/*"
              style="font-size:0.9rem;"
          />
        </div>
        <div v-if="form.profilePic" class="mb-2">
          <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteProfilePic"
              style="font-size:0.8rem;"
          >
            Remove Picture
          </button>
        </div>
      </div>

      <!-- Form Fields Section (Right Side) -->
      <div class="col">
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">First Name</label>
              <input v-model="form.firstName" type="text" class="form-control" placeholder="e.g John" style="font-size:1rem; color: black; background-color: white;" />
              <div v-if="errors.firstName" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.firstName }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">
                <i class="bi bi-calendar-event-fill" style="color: black; margin-right: 8px; font-size: 1.2rem; cursor: pointer;" @click="openDatePicker" title="Click to open date picker"></i>
                Date of Birth
              </label>
              <input v-model="form.dateOfBirth" type="date" class="form-control" style="font-size:1rem; color: black; background-color: white;" />
              <div v-if="errors.dateOfBirth" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.dateOfBirth }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Cellphone Number</label>
              <input v-model="form.cellphoneNumber" type="tel" class="form-control" placeholder="e.g 0635126724" style="font-size:1rem; color: black; background-color: white;" />
              <div v-if="errors.cellphoneNumber" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.cellphoneNumber }}</div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Last Name</label>
              <input v-model="form.lastName" type="text" class="form-control" placeholder="e.g Doe" style="font-size:1rem; color: black; background-color: white;" />
              <div v-if="errors.lastName" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.lastName }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Email Address</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="e.g john@gmail.com" style="font-size:1rem; color: black; background-color: white;" />
              <div v-if="errors.email" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.email }}</div>
            </div>
          </div>
        </div>

        <!-- Update Button -->
        <div class="mt-5 text-end">
          <button class="btn btn-success px-5 py-2" style="font-size:1rem;" type="submit">Update Profile</button>
        </div>
      </div>
    </div>
  </form>
</template>