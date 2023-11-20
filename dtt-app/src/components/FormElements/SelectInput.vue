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
  },
  options: {
    type: Object,
    required: true
  },
  defaultValue: {
    type: String,
    default: ''
  }
})
const { label, id, errorMsg, isMandatory, inputClass, divClass, form } = toRefs(props)
</script>
<template>
  <div :class="divClass">
    <label :for="id" class="input-field-title mt-1 mb-1"
      >{{ label }}<span v-if="isMandatory">*</span></label
    >
    <select
      id="id"
      :class="[inputClass, { error: errorMsg }]"
      :options="options"
      v-model="form[id]"
    >
      <option
        :selected="defaultValue"
        :value="value.value"
        v-for="value in options"
        :key="value"
      >
        {{ value.message }}
      </option>
    </select>
    <small v-if="errorMsg" class="text-left error-message">{{ errorMsg }}</small>
  </div>
</template>
<style></style>
