<template>
  <div style="display: none;">
  <div id="pdf" style="width:794px; height:1120px; background: white; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; overflow:hidden;">
    <div style="width: 100%; padding:10px;  background: #141414; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
      <h6>
        <strong>
          Studio Vista
        </strong>
      </h6>
      <div>
        <i class="fas fa-user"></i>
        <label style="font-size: small; margin: 5px;" v-text="username"/>
      </div>
    </div>

    <div style="width: 100%; padding:10px;  background: #282828; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
      <h6>
        <strong>
          {{ movieName }}
        </strong>
      </h6>
      <h6>
        <strong>
          Ticket PDF
        </strong>
      </h6>
    </div>


    <div style="width: 100%; padding:10px; display: flex; flex-direction: row; justify-content: flex-start; gap: 50px; align-items: center; color: #141414; text-align: left">
      <img :src= "'data:image/jpeg;base64,'+ image" style="height: 100px; width: auto;"/>

        <div>
          <h6>
            <strong>
              {{ movieName }}
            </strong>
          </h6>
        </div>

      <div>
        <p>
        {{quantity}} ticket(s) x {{movieName}} <br/>
          Ticket price: R{{price}} each
        </p>
      </div>
    </div>

    <div style="width: 40%; padding:10px;  background: #141414; display: flex; flex-direction: row; justify-content: space-between; align-items: center; align-self: flex-end;">
      <h6>
        <strong>
          Total: R{{total}}
        </strong>
      </h6>
    </div>
    <div style="width: 40%; padding-left: 10px; background: #00FF7F; align-self: flex-end; color: #141414; text-align: left; font-size: x-small;">
      {{quantity}} ticket(s)
    </div>
  </div>
  </div>
  <PrimaryButton @click="helper.exportToPDF('pdf', movieName)" button-text="Export as PDF"/>
</template>
<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";
import helper from "../util/helper";

defineProps({
  movieName: String,
  total: Number,
  quantity: Number,
  price: Number,
  image: String,
})

const username=localStorage.getItem('username');
</script>