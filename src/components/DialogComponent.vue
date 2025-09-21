<template>
  <div class="modal fade" id="dialogPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <PrimaryButton button-text="Cancel" data-bs-dismiss="modal"/>
          <PrimaryButton button-text="Proceed" @click="$emit('confirm')" data-bs-dismiss="modal"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";

defineProps({
  title: String,
  message: String,
})
</script>
<style scoped>
.modal-content{
  background: #141414;
}
</style>