<!--<script setup>-->

<!--import { ref, onMounted, watch } from "vue";-->
<!--import { useRoute } from "vue-router";-->
<!--import UserProfileComponent from "../components/UserProfileComponent.vue";-->

<!--const userData = ref({-->
<!--  firstName: "",-->
<!--  lastName: "",-->
<!--  email: "",-->
<!--  phone: "",-->
<!--  profilePic: null,-->
<!--  dateOfBirth: "",-->
<!--});-->

<!--const route = useRoute();-->

<!--function loadUserProfile() {-->
<!--  const saved = localStorage.getItem("userProfile");-->
<!--  if (saved) {-->
<!--    userData.value = JSON.parse(saved);-->
<!--  } else {-->
<!--    // Initialize with default data to ensure profile picture circle is always visible-->
<!--    userData.value = {-->
<!--      firstName: "",-->
<!--      lastName: "",-->
<!--      email: "",-->
<!--      phone: "",-->
<!--      profilePic: null,-->
<!--      dateOfBirth: "",-->
<!--    };-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  loadUserProfile();-->
<!--});-->

<!--watch(-->
<!--    () => route.fullPath,-->
<!--    () => {-->
<!--      loadUserProfile();-->
<!--    }-->
<!--);-->
<!--</script>-->

<!--<template>-->
<!--  <div class="container-fluid mt-5 px-4">-->
<!--    <div class="row justify-content-center">-->
<!--      <div class="col-12 col-lg-10">-->
<!--        <UserProfileComponent :user="userData" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

