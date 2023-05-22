<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from "vue-router";

const currentUser = ref(useAuthStore().user);
const router = useRouter();
const route = useRoute();

const jokes = ref([]);

const fetchJokes = () => {
  console.log("fetchJokes : ",currentUser.value.accessToken)
  axios
    .get('http://localhost:1234/api/my-jokes', {
      headers: {
        Authorization: 'Bearer ' + currentUser.value.accessToken,
      },
    })
    .then((response) => {
      console.log("fetchJokes : ",response.data)
      jokes.value = response.data
    })
    .catch((e) => {
      console.log(e);
    })
};

const deleteJoke = (id) => {
  axios
    .delete(`http://localhost:1234/api/joke/${id}`, {
      headers: {
        Authorization: 'Bearer ' + currentUser.value.accessToken,
      },
    })
    .then((response) => {
      console.log("deleteJoke : ",response.data);
      fetchJokes();
    })
    .catch((e) => {
      console.log(e);
    })
};

const editJoke = (id) => {
  router.push({ name: 'jokes.edit', params: { id: id } });
};

onMounted(() => {
  if (currentUser.value == undefined || currentUser.value == null || currentUser.value.accessToken == undefined || currentUser.value.accessToken == null) {
    router.push('/auth/login');
    return;
  }

  fetchJokes();
});
</script>
<template>
<q-page>
<div class="col-12 q-pa-lg">

      <div class="text-h6">My jokes</div>


<q-list>
<div v-for="joke in jokes"
    :key="joke.id">
  <q-item
    v-ripple
    clickable
    class="q-px-none"
  >
    <q-item-section>
      <q-item-label>{{ joke.title }}</q-item-label>
      <q-item-label caption>{{ joke.date }}</q-item-label>
      <q-item-label caption>{{ joke.content }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
      <q-btn
        flat
        dense
        round
        icon="edit"
        class="q-ml-sm"
        @click="editJoke(joke.id)"
      />
      <q-btn
        flat
        dense
        round
        icon="delete"
        class="q-ml-sm"
        @click="deleteJoke(joke.id)"
      />
      </div>
    </q-item-section>
  </q-item>
  <q-separator />
</div>
</q-list>

</div></q-page>
</template>
