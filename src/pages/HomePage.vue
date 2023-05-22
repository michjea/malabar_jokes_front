<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const joke = ref({
  title: '',
  content: '',
  username: '',
  date: '',
})

const fetchJokeApi = async () => {
  const result = await axios.get('https://api.humorapi.com/jokes/random', {
    headers: {
      'x-api-key': '138c830be6504ef39eef18c5f47ab960',
    },
  })

  //console.log(result.data)
  joke.value.title = result.data.id
  joke.value.content = result.data.joke
  joke.value.username = 'Humor API'
  joke.value.date = 'unknown'
}

const fetchRandomJoke = async() => {
  const result = await axios.get('http://localhost:1234/api/random-joke');

  joke.value.title = result.data.title
  joke.value.content = result.data.content
  joke.value.username = result.data.username
  joke.value.date = result.data.date

  //console.log(result.data)
}

onMounted(() => {
  fetchRandomJoke();
})

</script>
<template>
<q-page>
<div class="col-12 q-pa-lg">
  <!-- Joke card -->
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ joke.title }}</div>
      <div class="row">
      <div class="text-subtitle2 q-pr-sm">{{ joke.username }}</div>
      <div class="text">{{ joke.date }}</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text">{{ joke.content }}</div>
    </q-card-section>
  </q-card>

  <div class="row justify-around q-mt-md">
  <!-- Next joke button -->
  <q-btn
    color="primary"
    label="Next joke"
    class="col-5"
    @click="fetchRandomJoke"
  />

  <!-- Better joke button -->
  <q-btn
    color="primary"
    label="Better joke"
    class="col-5"
    @click="fetchJokeApi"
  />
  </div>
</div>
</q-page>
</template>
