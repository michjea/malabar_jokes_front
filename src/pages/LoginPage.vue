<script setup>
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
})

const message = ref('')
const successful = ref(false)

const messageDivClass = computed(() => {
  return successful.value ? 'bg-green-2 text-center text-green-10' : 'bg-red-2 text-center text-red-10'
})


const login = () => {
  axios
    .post('http://localhost:1234/api/auth/signin', {
      username: form.username,
      password: form.password,
    })
    .then((response) => {
      console.log("login : ",response.data)
      useAuthStore().login(response.data)
      message.value = 'User was logged in successfully!'
      successful.value = true
      router.push('/')
    })
    .catch((e) => {
      message.value = e.response.data.message
      successful.value = false
    })
}

</script>

<template>
<q-page>
          <div class="col-12 q-pa-lg">

      <div
        v-if="message"
        :class="messageDivClass"
      >
        {{ message }}
      </div>

        <q-form @submit="login">
          <q-input
            filled
            v-model="form.username"
            label="Username"
            lazy-rules
            :rules="[val => !!val || 'Username is required']"
          />
          <q-input
            filled
            v-model="form.password"
            label="Password"
            lazy-rules
            :rules="[val => !!val || 'Password is required']"
          />

          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="q-mt-md"
          />
        </q-form>

  </div>
  </q-page>
</template>
