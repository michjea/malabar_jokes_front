<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useRoute, useRouter } from "vue-router";

const currentUser = computed(() => {
  return useAuthStore().user;
});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  //useAuthStore().init();
  console.log("currentUser : ", useAuthStore().user);
  console.log("currentUser login : ", currentUser.value);
  console.log(
    "currentUser state is loggedin : ",
    useAuthStore().initialState.status.loggedIn
  );
  console.log(
    "currentUser state is loggedin user : ",
    useAuthStore().initialState.status.user
  );

  if (!useAuthStore().initialState.status.loggedIn) {
    router.push("/auth/login");
    return;
  }
});

const logout = () => {
  useAuthStore().logout();
  router.push("/auth/login");
};
</script>
<template>
  <q-page>
    <!-- User infos -->
    <div class="col-12 q-pa-lg" v-if="currentUser">
      <div class="text-h6">User</div>
      <div class="row">
        <div class="col-6">
          <!-- Label and value -->
          <div class="text-subtitle2">Username</div>
          <div class="text-subtitle2" v-if="currentUser">ID</div>
          <div class="text-subtitle2" v-if="currentUser">Token</div>
        </div>
        <div class="col-6">
          <div class="text">{{ currentUser.username }}</div>
          <div class="text" v-if="currentUser">{{ currentUser.id }}</div>
          <div class="text" v-if="currentUser">
            {{ currentUser.accessToken.substring(0, 20) }} ...
            {{
              currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )
            }}
          </div>
        </div>
      </div>

      <q-btn color="primary" label="Logout" @click="logout" />
    </div>
  </q-page>
</template>
