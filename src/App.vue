<script setup lang="ts">
import { ref } from 'vue'

import HelloUser from './components/HelloUser.vue'
// import Card from './layouts/Card.vue'

const tasks = ref([])
</script>

<template>
  <!-- <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div> -->
  <main>
        <HelloUser />
        <!-- <Card>
            <template v-slot:heading>
                <h2>Placeholder heading!</h2>
            </template>
            <template v-slot:body>
                Placeholder body content!
            </template>
        </Card> -->
  </main>
</template>

<style scoped>
</style>
