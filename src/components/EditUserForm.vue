<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import router from "../router/index.js";
import {
  createAddress,
  createAdmin,
  getAdminDetails,
  getCustomerDetails,
  updateAdmin,
  updateCustomer
} from "../routes/routes.js";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryTag from "./PrimaryTag.vue";
import SecondaryTag from "./SecondaryTag.vue";
import DialogComponent from "./DialogComponent.vue";
const user = ref({});

const firstName = ref();
const lastName = ref();
const email = ref();
const dateOfBirth = ref();
const gender = ref();
const cellphoneNumber = ref();
const address = reactive({
  streetName: "",
  streetNumber: "",
  suburb: "",
  city: "",
  country: "",
  postalCode: ""
});

const userAddress = ref();
const image = ref();

const isAdmin = localStorage.getItem("isAdmin");

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  cellphoneNumber: "",
  dateOfBirth: "",
  gender: "",
  address: ""
});

onBeforeMount(async () => {
  const savedUserId = localStorage.getItem("authenticatedUserId");
  if (isAdmin !== 'true') {
    user.value = await getCustomerDetails(savedUserId);
  } else {
    user.value = await getAdminDetails(savedUserId);
  }
  firstName.value = user.value.firstName;
  lastName.value = user.value.lastName;
  email.value = user.value.email;
  dateOfBirth.value = user.value.dateOfBirth;
  gender.value = user.value.gender;
  cellphoneNumber.value = user.value.cellphoneNumber;

  if (user.value.address) {
    address.streetName = user.value.address.streetName;
    address.streetNumber = user.value.address.streetNumber;
    address.suburb = user.value.address.suburb;
    address.city = user.value.address.city;
    address.country = user.value.address.country;
    address.postalCode = user.value.address.postalCode;
  }
  image.value = user.value.image;
});

function onFileChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result.split(",")[1];
  };
  reader.readAsDataURL(file);
}

function deleteProfilePic() {
  image.value = null;
}

function openDatePicker() {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.showPicker();
  }
}

function validateForm() {
  let valid = true;
  if (!firstName.value) {
    errors.firstName = "First name is required.";
    valid = false;
  } else {
    errors.firstName = "";
  }
  if (!lastName.value) {
    errors.lastName = "Last name is required.";
    valid = false;
  } else {
    errors.lastName = "";
  }
  if (!email.value) {
    errors.email = "Email is required.";
    valid = false;
  } else if (!email.value.includes("@")) {
    errors.email = "Email must contain '@'.";
    valid = false;
  } else {
    errors.email = "";
  }
  if (!cellphoneNumber.value) {
    errors.cellphoneNumber = "Contact number is required.";
    valid = false;
  } else if (!/^\d{10}$/.test(cellphoneNumber.value)) {
    errors.cellphoneNumber = "Contact number must be exactly 10 digits.";
    valid = false;
  } else {
    errors.cellphoneNumber = "";
  }
  if (!dateOfBirth.value) {
    errors.dateOfBirth = "Date of birth is required.";
    valid = false;
  } else {
    errors.dateOfBirth = "";
  }
  if (!gender.value) {
    errors.gender = "Gender is required.";
    valid = false;
  } else {
    errors.gender = "";
  }

  // Basic address validation
  if (!address.streetName || !address.city || !address.country) {
    errors.address = "All address fields are required.";
    valid = false;
  } else {
    errors.address = "";
  }

  return valid;
}

async function saveProfile() {
  if (!validateForm()) return;

  userAddress.value = await createAddress(address);

  const userToUpdate = {
    userId: user.value.userId,
    username: user.value.username,
    password: user.value.password,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    address: {
      addressId: userAddress.value.addressId,
      streetNumber: userAddress.value.streetNumber,
      streetName: userAddress.value.streetName,
      suburb: userAddress.value.suburb,
      city: userAddress.value.city,
      country: userAddress.value.country,
      postalCode: userAddress.value.postalCode
    },
    cellphoneNumber: cellphoneNumber.value,
    gender: gender.value,
    dateOfBirth: dateOfBirth.value,
    image: image.value
  };


  try {
    if (isAdmin !== 'true') {
      await updateCustomer(userToUpdate);
    } else {
      await updateAdmin(userToUpdate);
    }
    alert("Update Successful");
    router.push("/user-details");
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Something went wrong while updating your profile.");
  }
}
</script>

<template>
  <form class="card p-5 shadow-lg mx-auto">
    <div class="mb-5">
      <h2>
        <strong>Profile:</strong> {{ user.username }}
      </h2>
      <PrimaryTag v-if="isAdmin === 'true'" label="Admin" />
      <SecondaryTag v-else label="Customer" />
    </div>

    <div class="row align-items-start">
      <!-- Profile Picture Section -->
      <div class="col-auto text-center" style="min-width:200px; margin-right: 30px;">
        <img v-if="image"
             :src="'data:image/jpeg;base64,' + image"
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
        <div class="mb-3">
          <input class="form-control" id="userImage" type="file" accept="image/png, image/jpeg" @change="onFileChange" />
        </div>
        <div v-if="image" class="mb-2">
          <PrimaryButton style="background: crimson" button-text="Remove Image" @click="deleteProfilePic()" />
        </div>
      </div>

      <!-- Form Fields -->
      <div class="col">
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="form-label fw-bold">First Name</label>
              <input v-model="firstName" type="text" class="form-control" placeholder="e.g John" />
              <div v-if="errors.firstName" class="text-danger mt-1">{{ errors.firstName }}</div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">
                <i class="bi bi-calendar-event-fill" @click="openDatePicker" style="cursor:pointer;"></i> Date of Birth
              </label>
              <input v-model="dateOfBirth" type="date" class="form-control" />
              <div v-if="errors.dateOfBirth" class="text-danger mt-1">{{ errors.dateOfBirth }}</div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Email Address</label>
              <input v-model="email" type="email" class="form-control" placeholder="e.g john@gmail.com" />
              <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="form-label fw-bold">Last Name</label>
              <input v-model="lastName" type="text" class="form-control" placeholder="e.g Doe" />
              <div v-if="errors.lastName" class="text-danger mt-1">{{ errors.lastName }}</div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Gender</label>
              <select v-model="gender" class="form-control">
                <option value="">-- Select Gender --</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Cellphone Number</label>
              <input v-model="cellphoneNumber" type="tel" class="form-control" placeholder="e.g 0635126724" />
              <div v-if="errors.cellphoneNumber" class="text-danger mt-1">{{ errors.cellphoneNumber }}</div>
            </div>
          </div>

          <!--  Address Section Full Width -->
          <div class="col-12 mt-4">
            <h5 class="text-center fw-bold mb-3">Address</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Street Name</label>
                <input v-model="address.streetName" type="text" class="form-control" placeholder="e.g Main Street" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Street Number</label>
                <input v-model="address.streetNumber" type="text" class="form-control" placeholder="e.g 123" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Suburb</label>
                <input v-model="address.suburb" type="text" class="form-control" placeholder="e.g Woodstock" />
              </div>
              <div class="col-md-6">
                <label class="form-label">City</label>
                <input v-model="address.city" type="text" class="form-control" placeholder="e.g Cape Town" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Country</label>
                <input v-model="address.country" type="text" class="form-control" placeholder="e.g South Africa" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Postal Code</label>
                <input v-model="address.postalCode" type="text" class="form-control" placeholder="e.g 8000" />
              </div>
            </div>
            <div v-if="errors.address" class="text-danger mt-2">{{ errors.address }}</div>
          </div>
        </div>

        <div class="mt-5 text-end">
          <PrimaryButton button-text="Update Profile" data-bs-toggle="modal" data-bs-target="#dialogPopup" />
        </div>
        <DialogComponent
            title="Update"
            message="Are you sure you want to update this profile?"
            primary-text="Update"
            secondary-text="Cancel"
            @confirm="saveProfile()"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
.card {
  width: 80vw;
  background: transparent;
}
</style>
