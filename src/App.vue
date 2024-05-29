<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layouts/default.vue'
const components = {
  DefaultLayout
}
</script>

<template>
  <DefaultLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.path" class="mt-3" />
    </router-view>
  </DefaultLayout>
</template>

<style scoped></style>
