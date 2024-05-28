<template>
  <div class="flex flex-col items-center gap-2 h-screen mt-2 md:gap-8 md:mt-8">
    <h2 class="text-lg font-bold md:text-3xl">Welcome to BrainBlitz: Test Your Wits!</h2>
    <Quiz />
  </div>
</template>

<script setup>
import Quiz from '../components/quiz/Quiz.vue'
</script>

<style scoped></style>
