<script setup>
import { useHouseStore } from '../stores/store'
import router from '../router'
import { onMounted, ref } from 'vue'
import PopupDelete from '../components/PopupDelete.vue'
import { parsePrice } from '../utils/utils.js'

const houseStore = useHouseStore()
const selectedHouse = houseStore.selectedHouse
const selectHouse = (house, path) => {
  houseStore.selectHouse(house)
  router.push('/' + path)
}
const showPopup = ref(false)

const openPopup = () => {
  showPopup.value = true
}

const resetPopup = () => {
  showPopup.value = false
}

onMounted(() => {})
</script>
<template>
  <section>
    <div class="hide-large">
      <div class="row" style="z-index: 1000; position: relative">
        <div class="col-0-lg col-12-md col-12-sm has-margin-x">
          <a href="/">
            <img class="img-icon cursor" src="../assets/icons/ic_back_white@3x.png" />
          </a>
        </div>
      </div>
    </div>
    <PopupDelete v-if="showPopup" :houseId="selectedHouse.id" @reset-popup="resetPopup" />
    <div class="row">
      <div class="col-12-lg col-12-md col-12-sm">
        <div
          class="bg-responsive"
          :style="
            'background:url(' +
            selectedHouse.image +
            ') center/cover no-repeat;max-width: 100%;height: 45vh;'
          "
        ></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12-lg col-12-md col-12-sm bloc-info">
        <div class="row">
          <div
            :class="
              selectedHouse.madeByMe === true
                ? 'col-8-lg col-8-md col-8-sm align-self-center'
                : 'col-12-lg col-12-md col-12-sm'
            "
          >
            <h2 style="text-align: left">
              {{ selectedHouse.location.street }} {{ selectedHouse.location.houseNumber }}
            </h2>
          </div>
          <div
            v-if="selectedHouse.madeByMe === true"
            class="col-4-lg col-4-md col-4-sm d-flex justify-content-end align-items-center"
          >
            <img
              @click="selectHouse(selectedHouse, 'edit')"
              class="img-icon cursor"
              src="../assets/icons/ic_edit@3x.png"
            />
            <img
              @click="openPopup"
              class="img-icon cursor"
              src="../assets/icons/ic_delete@3x.png"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12-lg col-12-md col-12-sm">
            <div class="text-left d-flex mb-1">
              <img
                class="img-icon-mini align-self-center"
                src="../assets/icons/ic_location@3x.png"
              />
              <p class="">{{ selectedHouse.location.zip }} {{ selectedHouse.location.city }}</p>
            </div>
            <div class="col-12-lg col-12-md col-12-sm d-flex mb-1">
              <img class="img-icon-mini align-self-center" src="../assets/icons/ic_price@3x.png" />
              <p class="mr-1">{{ parsePrice(selectedHouse.price) }}</p>
              <img class="img-icon-mini align-self-center" src="../assets/icons/ic_size@3x.png" />
              <p class="mr-1">{{ selectedHouse.size }} m2</p>
              <img
                class="img-icon-mini align-self-center"
                src="../assets/icons/ic_construction_date@3x.png"
              />
              <p class="">Built in {{ selectedHouse.constructionYear }}</p>
            </div>
            <div class="col-12-lg col-12-md col-12-sm d-flex justify-content-start">
              <img class="img-icon-mini" src="../assets/icons/ic_bed@3x.png" />
              <p class="align-self-center mr-2">{{ selectedHouse.rooms.bedrooms }}</p>
              <img class="img-icon-mini" src="../assets/icons/ic_bath@3x.png" />
              <p class="align-self-center mr-2">{{ selectedHouse.rooms.bathrooms }}</p>
              <img class="img-icon-mini" src="../assets/icons/ic_size@3x.png" />
              <p class="align-self-center">{{ selectedHouse.size }} m2</p>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12-lg col-12-md col-12-sm">
            <p class="main-text">
              {{ selectedHouse.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.bloc-info {
  background: var(--background2);
  padding: 1.5rem;
}

@media screen and (max-width: 900px) {
  .bloc-info {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: fixed;
    top: 24%;
    left: 0;
    width: 100%;
    margin: 0 !important;
    z-index: 1000;
  }
  .bg-responsive {
    background-position: top!important;
    background-size:contain!important;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
  }
  .has-margin-x {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
