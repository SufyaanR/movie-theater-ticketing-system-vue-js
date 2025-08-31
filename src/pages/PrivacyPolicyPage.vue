<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import router from "../router";

function goBack() {
  router.back();
}
</script>

<template>
  <div class="policy-page main">
    <div class="policy-container">
      <h2>Privacy Policy</h2>
      <p>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        services.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We may collect information such as your name, email, contact details,
        and login information when you create an account or use our platform.
      </p>

      <h3>2. How We Use Your Information</h3>
      <p>
        Your information is used to provide and improve our services, process
        transactions, and communicate with you about updates or offers.
      </p>

      <h3>3. Sharing of Information</h3>
      <p>
        We do not sell your personal information. We may only share it with
        trusted third parties for service delivery and compliance with legal
        obligations.
      </p>

      <h3>4. Data Security</h3>
      <p>
        We implement security measures to protect your information from
        unauthorized access, alteration, or disclosure.
      </p>

      <h3>5. Your Rights</h3>
      <p>
        You may request access, correction, or deletion of your data at any
        time by contacting our support team.
      </p>

      <PrimaryButton button-text="Go Back" @click="goBack" />
    </div>
  </div>
</template>

<style scoped>
.policy-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.policy-container {
  background: transparent;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 700px;
  color: white;
}

h2 {
  margin-bottom: 20px;
  color: #00ff7f;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #00ff7f;
}

p {
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
