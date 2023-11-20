<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useHouseStore } from '../stores/store'
import CardList from '../components/CardList.vue'
import NoResults from '../components/NoResults.vue'
import router from '../router'

const houseStore = useHouseStore()
const activeTab = ref('Price')
const listOfHouses = ref([])
const searchParam = ref('')
const noResults = ref(false)
const nbOfResults = ref('')
const showClear = ref(false)

const clearSearch = () => {
  searchParam.value = ''
  showClear.value = false
  noResults.value = false
  nbOfResults.value = ''
}

// SET ACTIVE TAB METHOD
const setActiveTab = (string) => {
  activeTab.value = string
}

// GEt DATA FROM API METHOD
const fetchData = () => {
  houseStore
    .getHouseList()
    .then((data) => {
      listOfHouses.value = data
    })
    .catch((err) => {
      console.log(err)
    })
}

const redirect = (url) => {
  router.push(url)
}

onMounted(() => {
  fetchData()
})

//preloading the data before displaying the page doesn't work with setup syntax i chose
// onBeforeRouteEnter(async (to, from, next) => {
//   try {
//     fetchData().then(() => {
//       // Continuez la navigation
//       next()
//     })
//   } catch (error) {
//     next('/error')
//   }
// })
// SEARCH & FILTER METHOD
const filteredHouses = computed(() => {
  if (searchParam.value.trim() === '') {
    if (activeTab.value === 'Price') {
      return listOfHouses.value.sort((a, b) => a.price - b.price)
    } else {
      return listOfHouses.value.sort((a, b) => a.size - b.size)
    }
  } else {
    const query = searchParam.value.trim().toLowerCase()
    const results = listOfHouses.value.filter((house) => {
      return (
        house.location.street.toLowerCase().includes(query) ||
        house.size.toString().includes(query) ||
        house.price.toString().includes(query) ||
        house.location.zip.toLowerCase().includes(query) ||
        house.location.city.toLowerCase().includes(query)
      )
    })
    if (results.length === 0) {
      noResults.value = true
    } else {
      nbOfResults.value = results.length.toString()
    }
    return results
  }
})

const updateNumberOfResults = () => {
  if (filteredHouses.value.length === 0) {
    noResults.value = true
    nbOfResults.value = ''
  } else {
    noResults.value = false
    nbOfResults.value = filteredHouses.value.length.toString()
  }
}

const numberOfResults = computed(() => {
  updateNumberOfResults()
  return nbOfResults.value
})

const handleClearIcon = () => {
  showClear.value = true
}

watch(searchParam, (newSearchParam) => {
  if (newSearchParam === '') {
    clearSearch()
  }
})
</script>
<template>
  <main class="container">
    <div class="row mt-2 mb-1">
      <div class="col-9-lg col-10-md col-10-sm">
        <h2>Houses</h2>
      </div>
      <div class="col-3-lg col-2-md col-2-sm text-right">
        <button class="hide-small" @click="redirect('/create')">
          <img src="../assets/icons/ic_plus_white@3x.png" class="img-icon" /><span
            class="hide-small"
            >CREATE NEW</span
          >
        </button>
        <button class="hide-large" style="background: transparent" @click="redirect('/create')">
          <img src="../assets/icons/ic_plus_grey@3x.png" class="img-icon" />
        </button>
      </div>
    </div>
    <div class="row mb-1">
      <div class="input-container col-6-lg col-12-md col-12-sm mb-1">
        <img id="icon-glass" src="../assets/icons/ic_search@3x.png" />
        <form action="">
          <input
            v-model="searchParam"
            class="input-field"
            type="search"
            placeholder="Search for a house"
            v-on:input="handleClearIcon"
          />
        </form>
        <div v-if="showClear" id="clear-icon" @click="clearSearch"></div>
      </div>
      <div class="tabs col-6-lg col-12-md col-12-sm text-right">
        <button :class="{ active: activeTab === 'Size' }" @click="setActiveTab('Price')">
          Price
        </button>
        <button :class="{ active: activeTab === 'Price' }" @click="setActiveTab('Size')">
          Size
        </button>
      </div>
    </div>
    <div class="mb-1 mt-1" v-if="searchParam !== '' && numberOfResults > 0">
      <h2>{{ numberOfResults }} {{ numberOfResults > 1 ? 'results' : 'result' }} found</h2>
    </div>
    <NoResults v-if="noResults" />
    <CardList v-else :listOfHouses="filteredHouses" />
  </main>
</template>
<style>
.input-container {
  position: relative;
  width: 100% !important;
}

.input-container input[type='search'] {
  max-width: 100%;
  padding-left: 40px;
}

#icon-glass {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 20px;
  width: 20px;
}

.input-field {
  background: var(--tertiary);
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
}

#clear-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-image: url('../assets/icons/ic_clear@3x.png');
  background-size: contain;
  background-repeat: no-repeat;
}

@media screen and (max-width: 900px) {
  .tabs {
    width: 100%;
  }
  #icon-glass {
    top: 15px;
  }
  #clear-icon {
    top: 15px;
  }
}
</style>
