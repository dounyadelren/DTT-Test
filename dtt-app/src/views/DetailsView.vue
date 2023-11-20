<script setup>
import BackButton from '../components/BackButton.vue'
import CardList from '../components/CardList.vue'
import CardDetails from '../components/CardDetails.vue'
import { useHouseStore } from '../stores/store'
import { ref, onMounted } from 'vue'

const houseStore = useHouseStore()
const listOfHouses = ref([])

const fetchData = () => {
  houseStore
  .getHouseList()
  .then((data) => {
      listOfHouses.value = data;
      listOfHouses.value = listOfHouses.value.slice(0, 3)
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {
  fetchData()
})
</script>
<template>
  <main class="container">
    <BackButton name="overview" url="/"  class="hide-small" />
    <div class="row">
      <div class="col-6-lg col-12-md col-12-sm">
        <CardDetails />
      </div>
      <div class="col-1-lg hide-small"></div>
      <div class="col-5-lg col-12-md col-12-sm recommended">
        <div class="row">
          <div class="col-12-lg col-12-md col-12-sm mb-1">
            <h2 class="text-left">Recommended for you</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12-lg col-12-md col-12-sm">
            <CardList :listOfHouses="listOfHouses"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
@media screen and (max-width: 900px) {
  .recommended {
    position: fixed;
    top: 60%
  }
}
</style>

