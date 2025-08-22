<script>
import paywallComponent from "../components/PaywallComponent.vue";

export default {
  components: { paywallComponent },
  data() {
    return {
      showPopup: false,
    };
  },
};
</script>

<template>
  <div>
    <button @click="showPopup = true" class="open-btn">Open Popup</button>
    <paywall-component v-if="showPopup" @close="showPopup = false"/>
  </div>
</template>

<style>
.open-btn {
  padding: 10px 20px;
  background: #00ff80;
  border: none;
  border-radius: 8px;
}
</style>
