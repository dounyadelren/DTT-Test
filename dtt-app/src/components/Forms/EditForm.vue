<script setup>
import ClassicInput from '../FormElements/ClassicInput.vue'
import SelectInput from '../FormElements/SelectInput.vue'
import TextAreaInput from '../FormElements/TextAreaInput.vue'
import UploadInput from '../FormElements/UploadInput.vue'
import BackButton from '../BackButton.vue'
import { useHouseStore } from '../../stores/store'
import { reactive, ref, onMounted, computed, watch } from 'vue'
import router from '../../router'

const options = [
  { message: 'Yes', value: true },
  { message: 'No', value: false }
]
const houseStore = useHouseStore()
const selectedHouse = computed(() => houseStore.selectedHouse)
const errorMsg = ref('')
const canPost = ref(true)
const selectedImage = ref(null)

const editForm = reactive({
  price: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  city: '',
  zip: '',
  hasGarage: '',
  madeByMe: true,
  constructionYear: '',
  description: '',
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  image: ''
})

const updateSelectedImage = (imageURL) => {
  selectedImage.value = imageURL
  console.log(selectedImage.value)
}

const editListing = (editForm, e) => {
  e.preventDefault()
  //Step 1 : check if all fields are empty
  let isEmpty = false
  const mandatoryFields = [
    'price',
    'bedrooms',
    'bathrooms',
    'size',
    'city',
    'zip',
    'hasGarage',
    'constructionYear',
    'description',
    'streetName',
    'houseNumber',
    'image'
  ]

  mandatoryFields.forEach((element) => {
    if (editForm[element] === '') {
      isEmpty = true
    }
  })

  if (isEmpty === true) {
    errorMsg.value = `Required field missing`
    canPost.value = false
  }

  // Step 2 transform data and post
  if (canPost.value === true) {
    try {
      const formData = new FormData()
      Object.keys(editForm).forEach((element) => {
        formData.append(element, editForm[element])
      })
      houseStore.editListing(formData, selectedHouse.value.id)
        .then(() => {
          console.log('house edited')
          router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  editForm.streetName = selectedHouse.value.location.street
  editForm.price = selectedHouse.value.price
  editForm.size = selectedHouse.value.size
  editForm.hasGarage = selectedHouse.value.hasGarage
  editForm.constructionYear = selectedHouse.value.constructionYear
  editForm.houseNumber = selectedHouse.value.location.houseNumber
  editForm.numberAddition = selectedHouse.value.location.houseNumberAddition
  editForm.description = selectedHouse.value.description
  editForm.zip = selectedHouse.value.location.zip
  editForm.city = selectedHouse.value.location.city
  editForm.description = selectedHouse.value.description
  editForm.bedrooms = selectedHouse.value.rooms.bedrooms
  editForm.bathrooms = selectedHouse.value.rooms.bathrooms
  editForm.image = selectedHouse.value.image
})


// Check if image field is updated with selectedImage
watch(selectedImage, (newImage) => {
  editForm.image = newImage
})
</script>
<template>
  <main class="container">
    <div class="row">
      <div class="col-12-lg col-1-md col-4-sm">
        <BackButton name="detail page" :url="'/details'" />
      </div>
      <div class="hide-large col-11-md col-8-sm align-self-center">
        <h2 class="text-left">Edit listing</h2>
      </div>
    </div>
    <div class="row hide-small">
      <div class="col-12-lg mt-1 mb-1">
        <h2>Edit listing</h2>
      </div>
    </div>
    <form name="editForm" class="mb-2">
      <div class="row">
        <ClassicInput
          label="Street name"
          id="streetName"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :form="editForm"
          :errorMsg="!editForm.streetName && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="House number"
          id="houseNumber"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          :form="editForm"
          :errorMsg="!editForm.hosueNumber && errorMsg ? errorMsg : ''"
        />
        <ClassicInput
          label="Addition (optional)"
          id="HouseNumberAddition"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          :form="editForm"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Postal code"
          id="zip"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :form="editForm"
          :errorMsg="!editForm.zip && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="City"
          id="city"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :form="editForm"
          :errorMsg="!editForm.city && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <UploadInput
          label="Upload picture (PNG or JPG)"
          id="image"
          :isMandatory="true"
          inputClass="hidden"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :miniature="selectedHouse.image"
          @image-selected="updateSelectedImage"
          :form="editForm"
          :errorMsg="!editForm.image && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Price"
          id="price"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :form="editForm"
          :errorMsg="!editForm.price && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Size"
          id="size"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          :form="editForm"
          :errorMsg="!editForm.size && errorMsg ? errorMsg : ''"
        />
        <SelectInput
          label="Garage"
          id="hasGarage"
          :isMandatory="true"
          inputClass="classic-input select-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col"
          :options="options"
          :value="options.value"
          :defaultValue="editForm.hasGarage.toString()"
          :form="editForm"
          :errorMsg="!editForm.hasGarage && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Bedrooms"
          id="bedrooms"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          :form="editForm"
          :errorMsg="!editForm.bedrooms && errorMsg ? errorMsg : ''"
        />
        <ClassicInput
          label="Bathrooms"
          id="bathrooms"
          :isMandatory="true"
          type="text"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          :form="editForm"
          :errorMsg="!editForm.bathrooms && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Construction date"
          id="constructionYear"
          :isMandatory="true"
          type="text"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :form="editForm"
          :errorMsg="!editForm.constructionYear && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <TextAreaInput
          label="Description"
          id="description"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          inputClass="text-area"
          :isMandatory="true"
          :form="editForm"
          :errorMsg="!editForm.description && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row mt-1">
        <div class="col-4-lg col-12-md col-12-sm text-right mb-5">
          <button :disabled="!canPost" @click="editListing(editForm, $event)">
            <span>SAVE</span>
          </button>
        </div>
      </div>
    </form>
  </main>
</template>
