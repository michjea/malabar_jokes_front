<template>
  <q-layout view="lHh Lpr lFf">
    <nav-bar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './stores/auth';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
  mounted() {
    console.log("App mounted")
    useAuthStore().init()
  },
})
</script>
