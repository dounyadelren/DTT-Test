<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const imageSourceHome = ref('/src/assets/icons/ic_mobile_navigarion_home_active@3x.png')
const imageSourceInfo = ref('/src/assets/icons/ic_mobile_navigarion_info@3x.png')
const route = useRoute()

const toggleHomeActive = () => {
  if (imageSourceHome.value === '/src/assets/icons/ic_mobile_navigarion_home@3x.png') {
    imageSourceHome.value = '/src/assets/icons/ic_mobile_navigarion_home_active@3x.png'
    imageSourceInfo.value = '/src/assets/icons/ic_mobile_navigarion_info@3x.png'
  }
}

const toggleInfoActive = () => {
  if (imageSourceInfo.value === '/src/assets/icons/ic_mobile_navigarion_info@3x.png') {
    imageSourceInfo.value = '/src/assets/icons/ic_mobile_navigarion_info_active@3x.png'
    imageSourceHome.value = '/src/assets/icons/ic_mobile_navigarion_home@3x.png'
  }
}
</script>

<template>
  <nav class="nav hide-small">
    <div class="nav-child">
      <a href="https://www.d-tt.nl/en/" target="_blank">
        <img class="dtt-logo" src="../assets/images/img_logo_dtt@3x.png" />
      </a>
      <RouterLink
        to="/"
        active-class="desktop-header-active-menu"
        :class="{ 'desktop-header-inactive-menu': route.path !== '/' }"
        exact
        >Houses</RouterLink
      >
      <RouterLink
        to="/about"
        active-class="desktop-header-active-menu"
        :class="{ 'desktop-header-inactive-menu': route.path !== '/about' }"
        exact
        >About</RouterLink
      >
    </div>
  </nav>
  <nav class="hide-large nav-mobile">
    <RouterLink to="/"
      ><img class="home" @click="toggleHomeActive" :src="imageSourceHome"
    /></RouterLink>
    <RouterLink to="/about">
      <img class="info" @click="toggleInfoActive" :src="imageSourceInfo"
    /></RouterLink>
  </nav>
</template>
<style>
.dtt-logo {
  max-width: 170px;
}
</style>
