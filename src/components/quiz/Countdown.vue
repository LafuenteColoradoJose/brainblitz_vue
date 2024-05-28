<template>
    <div class="mt-2">
        <div v-if="countdown > 0">
            <h1 :class="{ orange: countdown <= 10, red: countdown <= 5 }">{{ countdown }}</h1>
        </div>
        <div v-else-if="countdown==null">
            <h1>20</h1>
        </div>
        <div v-else>
            <h2 class="">Countdown Finished!</h2>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import eventBus from '../../EventBus.js'

let intervalId = null
const countdown = ref(20)

onMounted(() => {
    eventBus.on('startCountdown', startCountdown)
    eventBus.on('restartCountdown', restartCountdown)
    eventBus.on('stopCountdown', stopCountdown)
})

onUnmounted(() => {
    eventBus.off('startCountdown', startCountdown)
    eventBus.off('restartCountdown', restartCountdown)
    eventBus.off('stopCountdown', stopCountdown)
})

function startCountdown() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
    countdown.value = 20
    intervalId = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            eventBus.emit('countdownFinished')
            clearInterval(intervalId)
            intervalId = null
        }
    }, 1000)
}

function restartCountdown() {
    countdown.value = 20
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

function stopCountdown() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
    countdown.value = null
   
}

</script>

<style scoped>
h1 {
    font-size: 24px;
    text-align: center;
    
}

h1.orange {
    color: #f6c358;
    font-weight: 700;
}

h1.red {
    color: #FF2D2D;
    font-weight: 700;
}
</style>