<script setup>
import ClassicInput from '../FormElements/ClassicInput.vue'
import SelectInput from '../FormElements/SelectInput.vue'
import TextAreaInput from '../FormElements/TextAreaInput.vue'
import UploadInput from '../FormElements/UploadInput.vue'
import BackButton from '../BackButton.vue'
import { reactive, ref, watch } from 'vue'
import { useHouseStore } from '../../stores/store'
import router from '../../router'

const options = [
  { message: 'Yes', value: true },
  { message: 'No', value: false }
]
const houseStore = useHouseStore()
const errorMsg = ref('')
const errorMsgDigit = ref('')
const canPost = ref(true)
const selectedImage = ref(null)

const createForm = reactive({
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

const resetErrorMessages = () => {
  errorMsg.value = '';
  errorMsgDigit.value = '';
  canPost.value = true
}

const createListing = (createForm, e) => {
  e.preventDefault()
  // Step 1 : Reset validation error messages 
  resetErrorMessages()
  //Step 2 : check if all fields are empty
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
    if (createForm[element] === '') {
      isEmpty = true
    }
  })

  if (isEmpty === true) {
    errorMsg.value = `Required field missing`
    canPost.value = false
  }

  // Step 3: custom validation with the digit fields example
  let digitRegex = new RegExp(/^\d+$/)
  const digitFields = ['bedrooms', 'bathrooms', 'size', 'price', 'houseNumber']

  digitFields.forEach((element) => {
    if (digitRegex.test(createForm[element]) === false) {
      errorMsgDigit.value = 'This field must contain numbers only'
      canPost.value = false
    }
  })

  // Step 4: transform data and post
  if (canPost.value === true) {
    try {
      const formData = new FormData()
      Object.keys(createForm).forEach((element) => {
        formData.append(element, createForm[element])
      })
      console.log(formData)
      houseStore
        .createListing(formData)
        .then(() => {
          console.log('new house listed')
          router.push('/details')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }
}

// Check if image field is updated with selectedImage
watch(selectedImage, (newImage) => {
  createForm.image = newImage
})
</script>
<template>
  <main class="container">
    <div class="row">
      <div class="col-12-lg col-1-md col-4-sm">
        <BackButton name="overview" url="/" />
      </div>
      <div class="hide-large col-11-md col-8-sm align-self-center">
        <h2 class="text-left">Create new listing</h2>
      </div>
    </div>
    <div class="row hide-small">
      <div class="col-12-lg mt-1 mb-1">
        <h2>Create new listing</h2>
      </div>
    </div>
    <form name="createForm" class="mb-2">
      <div class="row">
        <ClassicInput
          label="Street name"
          id="streetName"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          placeholder="Enter the street name"
          :form="createForm"
          :errorMsg="!createForm.streetName && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="House number"
          id="houseNumber"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          placeholder="Enter the house number"
          :form="createForm"
          :errorMsg="!createForm.houseNumber && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.houseNumber && errorMsgDigit ? errorMsgDigit : ''"
        />
        <ClassicInput
          label="Addition (optional)"
          id="numberAddition"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          placeholder="e.g. A"
          :form="createForm"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Postal code"
          id="zip"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          placeholder="e.g. 1000 AA"
          :form="createForm"
          :errorMsg="!createForm.zip && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="City"
          id="city"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          placeholder="Utrecht"
          :form="createForm"
          :errorMsg="!createForm.city && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <UploadInput
          label="Upload picture (PNG or JPG)"
          id="image"
          inputClass="hidden"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          :errorMsg="!createForm.image && errorMsg ? errorMsg : ''"
          @image-selected="updateSelectedImage"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Price"
          id="price"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          placeholder="e.g. € 150 000"
          :form="createForm"
          :errorMsg="!createForm.price && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.price && errorMsgDigit ? errorMsgDigit : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Size"
          id="size"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          placeholder="e.g. 60 m2"
          :form="createForm"
          :errorMsg="!createForm.size && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.size && errorMsgDigit ? errorMsgDigit : ''"
        />
        <SelectInput
          label="Garage"
          id="hasGarage"
          :isMandatory="true"
          inputClass="classic-input select-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col"
          :options="options"
          :form="createForm"
          :errorMsg="!createForm.hasGarage && errorMsg ? errorMsg : ''"
        />
      </div>
      <div class="row">
        <ClassicInput
          label="Bedrooms"
          id="bedrooms"
          :isMandatory="true"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          placeholder="Enter amount"
          :form="createForm"
          :errorMsg="!createForm.bedrooms && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.bedrooms && errorMsgDigit ? errorMsgDigit : ''"
        />
        <ClassicInput
          label="Bathrooms"
          id="bathrooms"
          :isMandatory="true"
          type="text"
          inputClass="classic-input"
          divClass="col-2-lg col-6-md col-6-sm d-flex flex-col mr-1"
          placeholder="Enter amount"
          :form="createForm"
          :errorMsg="!createForm.bathrooms && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.bathrooms && errorMsgDigit ? errorMsgDigit : ''"
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
          placeholder="e.g. 1990"
          :form="createForm"
          :errorMsg="!createForm.constructionYear && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.constructionYear && errorMsgDigit ? errorMsgDigit : ''"
        />
      </div>
      <div class="row">
        <TextAreaInput
          label="Description"
          id="description"
          divClass="col-4-lg col-12-md col-12-sm d-flex flex-col"
          inputClass="text-area"
          :isMandatory="true"
          placeholder="Enter description"
          :form="createForm"
          :errorMsg="!createForm.description && errorMsg ? errorMsg : ''"
          :errorMsgDigit="createForm.description && errorMsgDigit ? errorMsgDigit : ''"
        />
      </div>
      <div class="row mt-1">
        <div class="col-4-lg col-12-md col-12-sm text-right mb-5">
          <button :disabled="!canPost" @click="createListing(createForm, $event)">
            <span>POST</span>
          </button>
        </div>
      </div>
    </form>
  </main>
</template>
