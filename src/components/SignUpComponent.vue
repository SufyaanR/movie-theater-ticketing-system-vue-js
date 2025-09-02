<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import { useRouter } from "vue-router";-->
<!--import PrimaryButton from "../components/PrimaryButton.vue";-->
<!--import * as api from "../routes/routes.js";-->

<!--const router = useRouter();-->

<!--const firstName = ref("");-->
<!--const lastName = ref("");-->
<!--const username = ref("");-->
<!--const email = ref("");-->
<!--const password = ref("");-->

<!--// you can add more fields like address, cellphoneNumber, gender if needed-->
<!--// const address = ref("");-->
<!--// const cellphoneNumber = ref("");-->
<!--// const gender = ref("");-->

<!--function validateForm() {-->
<!--  if (!firstName.value || !lastName.value || !username.value || !email.value || !password.value) {-->
<!--    alert("Please fill in all required fields.");-->
<!--    return false;-->
<!--  }-->
<!--  if (!email.value.includes("@")) {-->
<!--    alert("Please enter a valid email.");-->
<!--    return false;-->
<!--  }-->
<!--  if (password.value.length < 8) {-->
<!--    alert("Password must be at least 8 characters long.");-->
<!--    return false;-->
<!--  }-->
<!--  return true;-->
<!--}-->

<!--async function createUser() {-->
<!--  if (!validateForm()) return;-->

<!--  const newUser = {-->
<!--    // no userId — backend usually generates this-->
<!--    username: username.value,-->
<!--    password: password.value,-->
<!--    firstName: firstName.value,-->
<!--    lastName: lastName.value,-->
<!--    email: email.value,-->
<!--    address: null,          // or add extra fields if your backend requires them-->
<!--    cellphoneNumber: null,-->
<!--    gender: null,-->
<!--    dateOfBirth: null,-->
<!--    cards: []-->
<!--  };-->

<!--  try {-->
<!--    await api.createCustomer(newUser);  // calls your backend-->
<!--    alert("Account created successfully!");-->
<!--    router.push("/login"); // go to login after signup-->
<!--  } catch (err) {-->
<!--    console.error("Failed to create account:", err);-->
<!--    alert("Something went wrong while creating your account.");-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="signup-page">-->
<!--    <div class="signup-container">-->
<!--      <h2>Create an account</h2>-->
<!--      <p class="login-link">-->
<!--        Already have an account? <a href="/login">Log in</a>-->
<!--      </p>-->

<!--      <form class="signup-form" >-->
<!--        <div class="name-fields">-->
<!--          <div class="field">-->
<!--            <label for="firstName">First Name</label>-->
<!--            <input-->
<!--                id="firstName"-->
<!--                v-model="firstName"-->
<!--                type="text"-->
<!--                placeholder="Enter your first name"-->
<!--            />-->
<!--          </div>-->

<!--          <div class="field">-->
<!--            <label for="lastName">Last Name</label>-->
<!--            <input-->
<!--                id="lastName"-->
<!--                v-model="lastName"-->
<!--                type="text"-->
<!--                placeholder="Enter your last name"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->

<!--        <label for="username">What should we call you?</label>-->
<!--        <input-->
<!--            id="username"-->
<!--            v-model="username"-->
<!--            type="text"-->
<!--            placeholder="Enter a display name"-->
<!--        />-->

<!--        <label for="email">What's your email?</label>-->
<!--        <input-->
<!--            id="email"-->
<!--            v-model="email"-->
<!--            type="email"-->
<!--            placeholder="Enter your email"-->
<!--        />-->

<!--        <label for="password">Create a password</label>-->
<!--        <input-->
<!--            id="password"-->
<!--            v-model="password"-->
<!--            type="password"-->
<!--            placeholder="Enter a strong password"-->
<!--        />-->
<!--        <p class="password-hint">-->
<!--          Use 8 or more characters with a mix of letters, numbers & symbols-->
<!--        </p>-->

<!--        <p class="terms">-->
<!--          By creating an account, you agree to the-->
<!--          <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.-->
<!--        </p>-->

<!--        <PrimaryButton button-text="Create an account" type="submit" @click="createUser"/>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.signup-page {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  min-height: 100vh;-->

<!--}-->

<!--.signup-container {-->
<!--  background: transparent;-->
<!--  padding: 30px;-->
<!--  border-radius: 10px;-->
<!--  text-align: left;-->
<!--  width: 100%;-->
<!--  max-width: 600px;-->
<!--}-->

<!--h2 {-->
<!--  text-align: center;-->
<!--  margin-bottom: 10px;-->
<!--  color: white;-->
<!--}-->

<!--.login-link {-->
<!--  text-align: center;-->
<!--  margin-bottom: 20px;-->
<!--  color: white;-->
<!--}-->

<!--.login-link a {-->
<!--  color: #00FF7F;-->
<!--  text-decoration: none;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.signup-form {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 15px;-->
<!--}-->

<!--.name-fields {-->
<!--  display: flex;-->
<!--  gap: 20px;-->
<!--}-->

<!--.field {-->
<!--  flex: 1;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--label {-->
<!--  color: white;-->
<!--  font-size: 0.95rem;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--input {-->
<!--  background: white;-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 5px;-->
<!--  color: black;-->
<!--  padding: 10px;-->
<!--  font-size: 1rem;-->
<!--  outline: none;-->
<!--}-->

<!--input:focus {-->
<!--  border-color: #00FF7F;-->
<!--}-->

<!--.password-hint {-->
<!--  font-size: 0.8rem;-->
<!--  color: white;-->
<!--  margin-top: -10px;-->
<!--}-->

<!--.terms {-->
<!--  font-size: 0.8rem;-->
<!--  color: white;-->
<!--  line-height: 1.4;-->
<!--}-->

<!--.terms a {-->
<!--  color: #00FF7F;-->
<!--  text-decoration: none;-->
<!--  font-weight: bold;-->
<!--}-->
<!--</style>-->

