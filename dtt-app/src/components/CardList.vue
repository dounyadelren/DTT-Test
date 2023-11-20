<script setup>
import router from '../router'
import { useHouseStore } from '../stores/store'
import PopupDelete from './PopupDelete.vue'
import { ref } from 'vue'
import { parsePrice } from '../utils/utils.js'

const { listOfHouses } = defineProps(['listOfHouses'])
const houseStore = useHouseStore()
const showPopup = ref(false)
const houseToDeleteId = ref(null)

const selectHouse = (house, path) => {
  if (path === 'delete') {
    // to only delete the clicked house
    showPopup.value = true
    houseToDeleteId.value = house.id
  } else {
    houseStore.selectHouse(house)
    router.push('/' + path)
  }
}
const openPopup = () => {
  showPopup.value = true
}

const resetPopup = () => {
  showPopup.value = false
}
</script>
<template>
  <div class="row card cursor mb-2" v-for="value in listOfHouses" :key="value.id">
    <PopupDelete v-if="showPopup && houseToDeleteId === value.id" :houseId="value.id" @reset-popup="resetPopup" />
    <div class="col-1-lg col-1-md col-1-sm" @click="selectHouse(value, 'details')">
      <div
        :style="
          'background:url(' +
          value.image +
          ') left/cover no-repeat;width:111px;height:111px;border-radius:10px;margin-right:1rem'
        "
      ></div>
    </div>
    <div class="col-11-lg col-11-md col-11-sm">
      <div class="row">
        <div
          :class="
            value.madeByMe === true
              ? 'col-4-lg col-8-md col-8-sm align-self-center'
              : 'col-12-lg col-12-md col-12-sm'
          "
        >
          <h2 style="text-align: left">
            {{ value.location.street }} {{ value.location.houseNumber }}
          </h2>
        </div>
        <div
          v-if="value.madeByMe === true"
          class="col-8-lg col-4-md col-4-sm d-flex justify-content-end align-items-center"
        >
          <img
            @click="selectHouse(value, 'edit')"
            class="img-icon cursor"
            src="../assets/icons/ic_edit@3x.png"
          />
          <img
            @click="selectHouse(value, 'delete')"
            class="img-icon cursor"
            src="../assets/icons/ic_delete@3x.png"
          />
        </div>
      </div>
      <div class="col-12-lg col-12-md col-12-sm">
        <p class="text-left">€ {{ parsePrice(value.price) }}</p>
        <p class="text-left" style="color: lightgrey">{{ value.location.zip }}</p>
        <div class="col-12-lg col-12-md col-12-sm d-flex justify-content-start img-icon-container">
          <img class="img-icon-mini" src="../assets/icons/ic_bed@3x.png" />
          <p class="align-self-center mr-1" style="color: lightgrey">{{ value.rooms.bedrooms }}</p>
          <img class="img-icon-mini" src="../assets/icons/ic_bath@3x.png" />
          <p class="align-self-center mr-1" style="color: lightgrey">{{ value.rooms.bathrooms }}</p>
          <img class="img-icon-mini" src="../assets/icons/ic_size@3x.png" />
          <p class="align-self-center" style="color: lightgrey">{{ value.size }} m2</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card {
  background: var(--background2);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.text-and-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}
</style>
