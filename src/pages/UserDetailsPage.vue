<script setup>
import { ref } from 'vue';
import { getUserDetails } from '../routes/routes';

const userQuery = ref();
const data = ref();
async function getDetails() {
    data.value = await getUserDetails(userQuery.value);
}
</script>

<template>
    <div class="main">
    <div>
      <h1 v-if="!data"><i class="fas fa-user"></i> Profile</h1>
      <h1 v-else><i class="fas fa-user"></i> {{data.userId}}</h1>
    </div>

    <input v-model="userQuery" placeholder="Search for userId"></input>
    <button @click="getDetails()">Search</button>
    <div v-if="userQuery">
        <h1>{{ data.firstName }} {{ data.lastName }}</h1>
        <p>ID: {{ data.userId }}</p>
        <p>Email: {{ data.email }}</p>
    </div>
    </div>
</template>

<style scoped>
.main{
  min-width: 100%;
  min-height: 100vh;
}
</style>