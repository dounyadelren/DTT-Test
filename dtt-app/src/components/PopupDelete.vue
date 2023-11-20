<script setup>
import { toRefs } from 'vue'
import { useHouseStore } from '../stores/store'
import { ref, defineEmits } from 'vue'

const houseStore = useHouseStore()
const props = defineProps({
  houseId: {
    type: Number
  }
})
const { houseId } = toRefs(props)
const showPopup = ref(true)
const emits = defineEmits(['reset-popup'])

const deleteHouse = (id) => {
  houseStore.deleteListing(id)
  setTimeout(() => {
    closePopup()
  }, 1000)
}

const closePopup = () => {
  showPopup.value = false
  emits('reset-popup')
}

</script>
<template>
  <div :key="showPopup" v-if="showPopup" class="modal-backdrop">
    <div class="modal">
      <slot name="header"><h2 class="pb-2">Delete listing</h2></slot>

      <slot name="body"
        ><p class="pb-2 text-secondary">
          Are you sure you want to delete this listing ? This action cannot be undone
        </p></slot
      >

      <slot name="footer">
        <button class="text-center mb-1" @click="deleteHouse(houseId)">YES, DELETE</button>
        <button class="text-center" style="background: var(--secondary)" @click="closePopup">
          GO BACK
        </button>
      </slot>
    </div>
  </div>
</template>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Couleur semi-transparente */
  z-index: 1000; /* Ajustez la valeur de z-index selon les besoins */
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-right: 6rem;
  padding-left: 6rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: var(--background2);
  border-radius: 10px;
}
@media screen and (max-width: 900px) {
  .modal {
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 2rem
  }
}
</style>
