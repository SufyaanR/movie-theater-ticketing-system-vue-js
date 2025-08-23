<script>
import paywallComponent from "../components/PaywallComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";

export default {
  components: {PrimaryButton, paywallComponent },
  data() {
    return {
      showPopup: false,
    };
  },
};
</script>

<template>
  <div class="main">
    <primaryButton @click="showPopup = true">Open Popup</primaryButton>
    <paywall-component v-if="showPopup" @close="showPopup = false"/>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
