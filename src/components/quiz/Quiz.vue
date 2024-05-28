<template>
  <div class="flex flex-col justify-between items-center">
    <div class="flex flex-row justify-between gap-2">
      <h1 class="italic mt-2 md:text-2xl">{{ userName }}</h1>
      <Score />
    </div>

    <Countdown />

    <FormQuiz />

  </div>
</template>

<script setup>
import Countdown from './Countdown.vue'
import Score from '../score/Score.vue'
import FormQuiz from './FormQuiz.vue'
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

let userName = ref('Unregistered user')

const authStore = useAuthStore();

watch(() => authStore.user, (newUser) => {
        if (newUser) {
          
          userName.value = newUser
        }
    
}, { immediate: true })


</script>

<style scoped></style>
