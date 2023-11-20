<script setup>
import { useRoute } from 'vue-router'
const { name, url } = defineProps(['name', 'url'])

const route = useRoute()
</script>
<template>
  <div class="row mt-2 mb-1" v-if="route.path !== '/' && route.path !== '/about'">
    <div class="col-12-lg col-12-md col-12-sm">
      <a :href="url" class="d-flex align-items-center cursor">
        <img class="img-icon" src="../assets/icons/ic_back_grey@3x.png" />
        <p class="back-btn-label hide-small">Back to {{ name }}</p>
      </a>
    </div>
  </div>
</template>
