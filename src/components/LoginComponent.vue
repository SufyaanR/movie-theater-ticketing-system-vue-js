<script setup>
import { ref } from 'vue';
import PrimaryButton from "../components/PrimaryButton.vue";

const email = ref("");
const password = ref("");


</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin" class="login-form">
        <label for="email">Email address or username</label>
        <input
            id="email"
            v-model="email"
            type="text"
            placeholder="Enter your email or username"
        />

        <label for="password">Password</label>
        <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
        />

        <p class="terms">
          By continuing, you agree to the <a href="#">Terms of Use</a> and
          <a href="#">Privacy Policy</a>.
        </p>


        <PrimaryButton
            button-text="Login"
            @click="handleLogin"
        />

        <p class="signup-text">
          Don’t have an account?
          <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

}

.login-container {
  background: transparent;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 550px;
}

h2 {

  margin-bottom: 20px;
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 5px;
}

input {
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #00FF7F;
}

.terms {
  font-size: 0.8rem;
  color: white;
  line-height: 1.4;
}

.terms a {
  color: #00FF7F;
  text-decoration: none;
}

.signup-text {
  text-align: center;
  color: white;
  margin-top: 10px;
}

.signup-text a {
  color: #00FF7F;
  font-weight: bold;
  text-decoration: none;
}
</style>
