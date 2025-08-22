<script setup>
import primaryButton from "../components/PrimaryButton.vue";
</script>

<template>
  <div class="paywall-container">
    <div class="paywall-header">
      <H1>Paywall</H1>
      <span>3 x Tickets for Mission Impossible @ R300</span>
      <primaryButton @click="$emit('close')">X</primaryButton>
    </div>

    <input type="text" class="input-field" placeholder="Cardholder Name">
    <input type="text" class="input-field" placeholder="Card Number">

    <div class="inline-fields">
      <input type="date" class="input-field inline-inputs" placeholder="Expiry Date">
      <input type="text" class="input-field inline-inputs" placeholder="CVV">
    </div>


    <primaryButton class="pay-button">Pay Now</primaryButton>

    <div class="card-icons">
      <img src="https://img.icons8.com/color/48/visa.png" alt="Visa">
      <img src="https://img.icons8.com/color/48/amex.png" alt="Amex">
      <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard">
      <img src="https://img.icons8.com/color/48/discover.png" alt="Discover">
    </div>
  </div>
</template>

<style scoped>

.paywall-container {
  border: 2px solid #00FF7F;
  border-radius: 5px;
  padding: 20px;
  width: 80%;
  height: 50vh;
}

.paywall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #00FF7F;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 25px;
  border: none;
  background: white;
  color: #1a1a1a;
}

.inline-inputs{
  width: 10vw;
}

.inline-fields {
  display: flex;
  gap: 10px;
}

.inline-fields input {
  flex: 1;
}

.pay-button {
  width: 50%;
  padding: 15px;
  font-weight: bold;
}

.card-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.card-icons img {
  width: 50px;
}
</style>