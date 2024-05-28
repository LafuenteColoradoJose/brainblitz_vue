<template>
    <div class="flex flex-row justify-between items-center border-4 border-[#479d9d] bg-[#35AFAE] p-4 gap-4 text-[#EAF2E3] font-semibold rounded-md h-10 
    md:h-24 md:text-2xl">
        <div class="">
            <h2>Score: {{ score }}</h2>
        </div>
        <div class="level">
            <h2>Level: {{ level }}</h2>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div v-for="star in stars" :key="star" class="flex flex-row w-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-[#f6c358] stroke-[#353531] w-5 h-auto"> 
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 8 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import eventBus from '../../EventBus.js';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();

const score = ref(authStore.storeScore || 0);
const level = ref(1);
const stars = ref(1);

eventBus.on('difficulty', (difficulty) => {
    if (difficulty === 'easy') {
        score.value += 1;
    } else if (difficulty === 'medium') {
        score.value += 2;
    } else if (difficulty === 'hard') {
        score.value += 3;
    }
    authStore.storeScore = score.value;
})

watch(score, (newScore, oldScore) => {
    if (Math.floor(newScore / 100) > Math.floor(oldScore / 100)) {
        level.value += 1;
        stars.value += 1;
    }
})


watch(() => authStore.storeScore, (newStoreScore) => {
    score.value = newStoreScore || 0;
}), { immediate: true }





</script>


