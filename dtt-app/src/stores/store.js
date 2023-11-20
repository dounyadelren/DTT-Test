// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import axios from 'axios'
import router from '../router'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

export const useHouseStore = defineStore('house', {
  state: () => ({
    selectedHouse: null
  }),
  actions: {
    async getHouseList(id) {
      if (id === undefined) {
        try {
          const response = await fetch(`${apiUrl}/houses`, {
            headers: {
              'X-Api-Key': apiKey,
            }
          })
          if (response && response.status === 200) {
            const data = await response.json();
            return data
          } else {
            console.error('Erreur:', response.status, response.statusText)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      } else {
        try {
          const response = await fetch(`${apiUrl}/houses/${id}`, {
            headers: {
              'X-Api-Key': apiKey,
            }
          })
          if (response && response.status === 200) {
            const data = await response.json();
            return data;
          } else {
            console.error('Erreur:', response.status, response.statusText)
          }
        } catch (error) {
          console.error('Error:', error)
        }

      }
    },
    selectHouse(house) {
      this.selectedHouse = house;
    },
    async createListing(form) {
      try {
        const response = await fetch(`${apiUrl}/houses/`, {
          headers: {
            'X-Api-Key': apiKey,
          },
          method: 'POST',
          body: form
        })
        //image is not created with the rest of the data
        if (response && response.status === 201) {
          const data = await response.json()
          const imageValue = form.get('image'); // get the image back here
          this.uploadImage(data.id, imageValue) // send to the proper request
          // update the store
          const updatedData = await this.getHouseList(data.id);
          this.selectHouse(updatedData[0]);
        } else {
          console.error('Erreur:', response.status, response.statusText);
          alert('Something went wrong');
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong');
      }
    },
    async uploadImage(id, image) {
      let formData = new FormData()
      formData.append('image', image)
      console.log('formdata reçu image', formData)
      await fetch(`${apiUrl}/houses/${id}/upload`, {
        headers: {
          'X-Api-Key': apiKey,
        },
        method: 'POST',
        body: formData
      })
        .then(() => {
          console.log('image uploaded');
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong');
        });
    },
    async editListing(form, id) {
      try {
        const response = await fetch(`${apiUrl}/houses/${id}`, {
          headers: {
            'X-Api-Key': apiKey,
          },
          method: 'POST',
          body: form
        })
        if (response.status === 204) {
          const imageValue = form.get('image'); // get the image back here
          this.uploadImage(id, imageValue) // send to the proper request
          console.log('listing modified')
          // update the store
          const updatedData = await this.getHouseList(id);
          this.selectHouse(updatedData[0]);
        } else {
          console.error('Erreur:', response.status, response.statusText);
          alert('Something went wrong');
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong');
      }
    },
    deleteListing(id) {
      fetch(`${apiUrl}/houses/${id}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
        method: 'DELETE'
      })
        .then(() => {
          console.log('listing deleted')
        })
        .catch((err) => {
          console.log(err)
          alert('Something went wrong')
        })
        .finally(() => {
          router.push('/')
        })
    }
  },
  persist: {
    enabled: true,
  },
})