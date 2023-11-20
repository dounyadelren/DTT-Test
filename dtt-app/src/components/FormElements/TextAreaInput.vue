<script setup>
import { toRefs } from 'vue'
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
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputClass: {
    type: String,
    default: ''
  },
  divClass: {
    type: String,
    default: ''
  },
  form: {
    type: Object,
    required: true
  }
})
const { label, id, errorMsg, isMandatory, placeholder, inputClass, divClass, form } = toRefs(props)
</script>
<template>
  <div :class="divClass">
    <label class="input-field-title mt-1 mb-1" :for="id"
      >{{ label }}<span v-if="isMandatory">*</span></label
    >
    <textarea
      :id="id"
      :class="[inputClass, { error: errorMsg }]"
      :placeholder="placeholder"
      v-model="form[id]"
    ></textarea>
    <small v-if="errorMsg" class="text-left error-message">{{ errorMsg }}</small>
  </div>
</template>
<style>
textarea {
  padding: 1rem;
  font-family: 'Open Sans';
}
</style>
