<script setup>
import { ref, onMounted, getCurrentInstance, watch } from "vue";
import { useAuthStore } from '../stores/auth'
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const currentUser = ref(useAuthStore().user);
const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => {
  useAuthStore().logout();
  router.push("/home");
};

const linksList = [
  {
    title: "Home",
    link: "home",
    icon: "home",
  },
  {
    title: "Profile",
    link: "profile",
    icon: "account_circle",
  },
  {
    title: "My Jokes",
    link: "profile.jokes",
    icon: "face",
  },
  {
    title: "Create Joke",
    link: "jokes.create",
    icon: "add",
  },
]

</script>
<template>
  <!--Toolbar-->
  <q-header elevated>
    <q-toolbar class="bg-grey-2">
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleLeftDrawer" color="black" />
      <q-img src="../assets/malabar_titre.png"  style="width: 100px;" fit="scale-down" class="q-ma-xs" />
      <q-toolbar-title class="text-black">Jokes</q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="account_circle" color="black" @click="() => router.push('/profile')" />
    </q-toolbar>
  </q-header>

  <!--Drawer-->
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="220">
    <q-list size="100px">
      <!-- Close button -->
      <q-item>
        <q-btn
          flat
          round
          dense
          icon="close"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
          color="primary"
        />
      </q-item>

      <!-- Logo -->
      <q-item>
        <q-avatar square size="200px">
          <img src="../assets/malabar.png" />
        </q-avatar>
      </q-item>

      <q-item
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
        clickable
        :to="{ name: link.link }"
        :class="link.link == route.name ? 'bg-pink-1' : ''"
        @click="link.action"
      >
        <q-item-section avatar>
          <q-icon
            :name="link.icon"
            :color="link.link == route.name ? 'primary' : 'grey-6'"
          />
        </q-item-section>
        <q-item-section class="text-black">{{ link.title }}</q-item-section>
        <q-item-section side>
          <q-icon
            :name="link.link == route.name ? 'chevron_left' : 'chevron_right'"
            :color="link.link == route.name ? 'primary' : 'grey-6'"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
