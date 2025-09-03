<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import router from "../router/index.js";
import {getAdminDetails, getCustomerDetails, updateAdmin, updateCustomer} from "../routes/routes.js";
import PrimaryButton from "./PrimaryButton.vue";
const user = ref({});

const firstName = ref();
const lastName = ref();
const email = ref();
const dateOfBirth = ref();
const cellphoneNumber = ref();

const isAdmin = localStorage.getItem("isAdmin");

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  cellphoneNumber: "",
  dateOfBirth: ""
});

onBeforeMount(async () => {
  const savedUserId = localStorage.getItem("authenticatedUserId");
  if(isAdmin!=='true'){
    user.value = await getCustomerDetails(savedUserId);
  }
  else{
    user.value = await getAdminDetails(savedUserId);
  }
  firstName.value = user.value.firstName;
  lastName.value = user.value.lastName;
  email.value = user.value.email;
  dateOfBirth.value = user.value.dateOfBirth;
  cellphoneNumber.value = user.value.cellphoneNumber;
});

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      form.image = e.target.result; // This stores the base64 data
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

function validateForm() {
  let valid = true;
  // First Name
  if (!firstName.value) {
    errors.firstName = "First name is required.";
    valid = false;
  } else {
    errors.firstName = "";
  }
  // Last Name
  if (!lastName.value) {
    errors.lastName = "Last name is required.";
    valid = false;
  } else {
    errors.lastName = "";
  }
  // Email
  if (!email.value) {
    errors.email = "Email is required.";
    valid = false;
  } else if (!email.value.includes("@")) {
    errors.email = "Email must contain '@'.";
    valid = false;
  } else {
    errors.email = "";
  }
  // Phone (only numbers and special characters)
  if (!cellphoneNumber.value) {
    errors.cellphoneNumber = "Contact number is required.";
    valid = false;
  } else if (!/^\d{10}$/.test(cellphoneNumber.value)) {
    errors.cellphoneNumber = "Contact number must be exactly 10 digits.";
    valid = false;
  }
  else {
    errors.cellphoneNumber = "";
  }
  // Date of Birth
  if (!dateOfBirth.value) {
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
    userId: user.value.userId,          // keep original ID
    username: user.value.username,      // unchanged
    password: user.value.password,      // unchanged (unless you add a field for it)
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    address: user.value.address,        // unchanged
    cellphoneNumber: cellphoneNumber.value,
    gender: user.value.gender,          // unchanged
    dateOfBirth: dateOfBirth.value,    // unchanged
  };

  if(isAdmin!=='true'){
  try {
    await updateCustomer(userToUpdate);
    alert("Update Successful")
    router.push("/user-details");
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Something went wrong while updating your profile.");
  }
  }
  else{
    try {
      await updateAdmin(userToUpdate);
      alert("Update Successful")
      router.push("/user-details");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Something went wrong while updating your profile.");
    }
  }
}

</script>
<template>
  <form class="card p-5 shadow-lg mx-auto">
    <div class="row align-items-start">
      <!-- Profile Picture Section (Left Side) -->
      <div class="col-auto text-center" style="min-width:200px; margin-right: 30px;">
        <img
            v-if="user.image"
            src="#"
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
        <div v-if="image" class="mb-2">
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
              <input v-model="firstName" type="text" class="form-control" placeholder="e.g John"/>
              <div v-if="errors.firstName" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.firstName }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">
                <i class="bi bi-calendar-event-fill" style="color: black; margin-right: 8px; font-size: 1.2rem; cursor: pointer;" @click="openDatePicker" title="Click to open date picker"></i>
                Date of Birth
              </label>
              <input v-model="dateOfBirth" type="date" class="form-control" />
              <div v-if="errors.dateOfBirth" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.dateOfBirth }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Cellphone Number</label>
              <input v-model="cellphoneNumber" type="tel" class="form-control" placeholder="e.g 0635126724" />
              <div v-if="errors.cellphoneNumber" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.cellphoneNumber }}</div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Last Name</label>
              <input v-model="lastName" type="text" class="form-control" placeholder="e.g Doe" />
              <div v-if="errors.lastName" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.lastName }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold" style="font-size:1rem;">Email Address</label>
              <input v-model="email" type="email" class="form-control" placeholder="e.g john@gmail.com"/>
              <div v-if="errors.email" class="text-danger mt-1" style="font-size:0.95rem;">{{ errors.email }}</div>
            </div>
          </div>
        </div>

        <!-- Update Button -->
        <div class="mt-5 text-end">
          <PrimaryButton button-text="Update Profile" @click="saveProfile"/>
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped>
.card{
width: 80vw;
background: transparent;
}
</style>