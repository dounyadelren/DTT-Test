<script setup>
import { useRoute } from 'vue-router'
import EditForm from "../components/Forms/EditForm.vue"
import CreateForm from "../components/Forms/CreateForm.vue"
const route = useRoute()
</script>
<template>
  <!-- THIS PAGE IS A LAYOUT BASE FOR ALL FORMS REGARDING CREATE EDIT OR DELETE LISTINGS -->
  <main class="layout-bg">
    <EditForm v-if="route.path === '/edit'" />
    <CreateForm v-if="route.path === '/create'" />
  </main>
</template>
<style>
.layout-bg {
  background-image: url('../assets/images/img_background@3x.png');
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
}
@media screen and (max-width: 900px) {
  .layout-bg {
    background-position:bottom;
  }
}
</style>
