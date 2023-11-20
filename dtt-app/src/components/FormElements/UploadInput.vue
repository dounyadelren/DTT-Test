<script setup>
import { toRefs, ref, defineEmits } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  errorMsg: {
    type: String,
    default: ''
  },
  isMandatory: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: String,
    default: ''
  },
  divClass: {
    type: String,
    default: ''
  },
  selectedImage: {
    type: String,
    default: ''
  }
})

const miniature = ref('') 
const emits = defineEmits('image-selected')

const clearMiniature = () => {
  miniature.value = '';
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  // console.log('file', file)
  if (file) {
    const imageURL = URL.createObjectURL(file)
    // console.log('imageURL', imageURL)
    // console.log(typeof imageURL)
    miniature.value = URL.createObjectURL(file)
    // console.log('miniature',miniature)
    emits('image-selected', imageURL);
    // selectedImage.value = URL.createObjectURL(file);
    // console.log('selectedImage', selectedImage.value)
  }
}

const { label, id, errorMsg, isMandatory, inputClass, divClass, selectedImage } = toRefs(props)
</script>
<template>
  <div :class="divClass">
    <label class="input-field-title mt-1 mb-1">{{ label }}<span v-if="isMandatory">*</span></label>
    <div v-if="miniature">
      <img :id="miniature" :src="miniature" class="miniature" :alt="miniature" />
      <img
        class="icon-clear cursor"
        @click="clearMiniature"
        src="../../assets/icons/ic_clear_white@3x.png"
      />
    </div>
    <div v-else class="upload-placeholder">
      <label :for="id"
        ><img class="icon-upload cursor" src="../../assets/icons/ic_upload@3x.png"
      /></label>
      <input type="file" :id="id" :class="inputClass" @change="handleFileChange" />
    </div>
    <small v-if="errorMsg" class="text-left error-message">{{ errorMsg }}</small>
  </div>
</template>
<style>
.miniature {
  width: 110px;
  height: 110px;
  border-radius: 10px;
  object-fit: cover;
  object-position: left;
}
.icon-clear {
  width: 30px;
  height: 30px;
  position: relative;
  top: -85px;
  right: 15px;
}
.upload-placeholder {
  border: 3px var(--tertiary2) dashed;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  padding: 1.5rem;
}
.icon-upload {
  position: relative;
  top: 23%;
  left: 27%;
  width: 50%;
}
</style>
