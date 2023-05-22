<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  date: '',
  user: '',
})

const createJoke = () => {
  axios
    .post('http://localhost:1234/api/joke', {
      title: form.title,
      content: form.content,
    }, {
      headers: {
        Authorization: `Bearer ${useAuthStore().user?.accessToken}`,
      },
    })
    .then((response) => {
      console.log("createJoke : ",response.data)
      router.push('/profile/jokes')
      //router.push({ name: 'JokePage', params: { id: response.data.id } })
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  if (useAuthStore().user == undefined || useAuthStore().user == null) {
    router.push('/auth/login')
    return
  }
})

</script>

<template>
<q-page>
<!-- form to create a new joke -->
      <div class="row justify-content-center">
        <div class="col-12 q-pa-lg">


              <div class="text-h6">Create a new joke</div>
              <q-form
                @submit="createJoke"
              >
                <!-- Add title input -->
                  <q-input
                    v-model="form.title"
                    filled
                    label="Title"
                    lazy-rules
                    :rules="[val => !!val || 'Title is required']"
                  />
                  <q-input
                    filled
                    v-model="form.content"
                    label="Content"
                    lazy-rules
                    :rules="[val => !!val || 'Content is required']"
                  ></q-input>
                <q-btn
                  type="submit"
                  color="primary"
                >
                  Create Joke
                </q-btn>
              </q-form>
        </div>
      </div>
      </q-page>
</template>
