<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useRouter, useRoute } from "vue-router";

const currentUser = ref(useAuthStore().user);

const form = reactive({
  title: "",
  content: "",
});

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);

const fetchJoke = () => {
  axios
    .get(`http://localhost:1234/api/joke/${id.value}`, {
      headers: {
        Authorization: "Bearer " + currentUser.value.accessToken,
      },
    })
    .then((response) => {
      console.log("fetchJoke : ", response.data);
      form.title = response.data.title;
      form.content = response.data.content;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateJoke = () => {
  axios
    .put(
      `http://localhost:1234/api/joke/${id.value}`,
      {
        title: form.title,
        content: form.content,
      },
      {
        headers: {
          Authorization: "Bearer " + currentUser.value.accessToken,
        },
      }
    )
    .then((response) => {
      console.log("updateJoke : ", response.data);
      router.push("/profile/jokes");
      //router.push({ name: 'JokePage', params: { id: response.data.id } })
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  if (!useAuthStore().initialState.status.loggedIn) {
    router.push("/login");
    return;
  }

  fetchJoke();
});
</script>

<template>
  <q-page>
    <!-- form to create a new joke -->
    <div class="row justify-content-center">
      <div class="col-12 q-pa-lg">
        <div class="text-h6">Update joke</div>

        <q-form @submit="updateJoke">
          <!-- Add title input -->
          <q-input
            v-model="form.title"
            filled
            label="Title"
            lazy-rules
            :rules="[(val) => !!val || 'Title is required']"
          />
          <q-input
            filled
            v-model="form.content"
            label="Content"
            lazy-rules
            :rules="[(val) => !!val || 'Content is required']"
          ></q-input>
          <q-btn type="submit" color="primary"> Update Joke </q-btn>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
