<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import router from "../router";

function goBack() {
  router.back();
}
</script>

<template>
  <div class="terms-page main">
    <div class="terms-container">
      <h1>
        <strong>
        Terms and Conditions
        </strong>
      </h1>
      <p>
        These Terms and Conditions govern your use of our platform. By using
        our services, you agree to comply with these terms.
      </p>

      <h5>1. Account Responsibilities</h5>
      <p>
        You are responsible for maintaining the confidentiality of your account
        and password and for all activities under your account.
      </p>

      <h5>2. Acceptable Use</h5>
      <p>
        You agree not to misuse our platform or engage in illegal activities
        while using our services.
      </p>

      <h5>3. Payments & Transactions</h5>
      <p>
        Any payments made through the platform must be accurate and authorized
        by you. Refunds and disputes are subject to our policies.
      </p>

      <h5>4. Limitation of Liability</h5>
      <p>
        We are not liable for damages caused by system downtime, unauthorized
        access, or issues beyond our control.
      </p>

      <h5>5. Changes to Terms</h5>
      <p>
        We reserve the right to update these terms at any time. Continued use
        of the platform means you accept the updated terms.
      </p>

      <PrimaryButton button-text="Go Back" @click="goBack" />
    </div>
  </div>
</template>

<style scoped>
.terms-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.terms-container {
  background: transparent;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 700px;
  color: white;
}

h1 {
  margin-bottom: 20px;
}

h5 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #00ff7f;
}

p {
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
