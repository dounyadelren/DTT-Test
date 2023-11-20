<script setup>
import { RouterView } from 'vue-router'
import Navbar from "./components/NavBar.vue"
</script>

<template>
  <header>
    <div class="wrapper">
      <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
