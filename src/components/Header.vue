<template>
  <header>
    <div style="display: flex; flex-direction: row;">
      <h2><strong>Studio Vista</strong></h2>
    </div>

    <nav>
      <a class="nav-elem" href="/movies">Browse Movies</a> | <a class="nav-elem" href="/about-us">About Us</a>
    </nav>

    <div class="login-sign-up">

      <PrimaryButton v-if="userId===null" link="/login" button-text="Login" />
      <PrimaryButton v-if="userId===null" link="/signup" button-text="Sign Up" />

      <a v-if="userId!==null" href="/user-details">
        <i class="fas fa-user"></i>
        <PrimaryTag v-if="userId" :label="username"/>
      </a>

      <PrimaryButton v-if="userId!==null" link="/login" button-text="Log Out"  @click="setUserDetails(false)"/>

    </div>
  </header>
</template>

<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryTag from "./PrimaryTag.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";

const userId = ref();
const isAdmin = ref();
const username = ref();

function setUserDetails(loggedIn = true){
  if(loggedIn){
  userId.value = localStorage.getItem('authenticatedUserId');
  username.value = localStorage.getItem('username');
  isAdmin.value = localStorage.getItem('isAdmin') === 'true';
  }
  else{
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('authenticatedUserId');
    userId.value = '';
    username.value = '';
    isAdmin.value = undefined;
  }

  if(userId.value!==null) {
    clearTimeout(intervalId);
  }
}

let intervalId;

onMounted(() => {
  setUserDetails();

  intervalId = setInterval(() => {
    setUserDetails();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
