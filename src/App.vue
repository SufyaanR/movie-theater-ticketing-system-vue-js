<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header class="header"/>
  <router-view :key="$route.fullPath" />
</template>

<style>
 .header{
   position: fixed;
   left: 0;
   width: 100vw;
 }
</style>



