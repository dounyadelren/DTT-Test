<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
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
  },
  errorMsgDigit: {
    type: String,
    default: ''
  }
})
const { label, type, id, errorMsg, isMandatory, placeholder, inputClass, divClass, form, errorMsgDigit } =
  toRefs(props)
</script>
<template>
  <div :class="divClass">
    <label :for="id" class="input-field-title mt-1 mb-1"
      >{{ label }}<span v-if="isMandatory">*</span></label
    >
    <div>
      <input
        :form="form"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :class="[inputClass, { error: errorMsg}]"
        v-model="form[id]"
      />
    </div>
    <small v-if="errorMsg" class="text-left error-message">{{ errorMsg }}</small>
    <small v-if="errorMsgDigit" class="text-left error-message">{{ errorMsgDigit }}</small>
  </div>
</template>
