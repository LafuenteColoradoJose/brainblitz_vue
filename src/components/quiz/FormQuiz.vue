<template>
    <section class="flex flex-col justify-between items-center gap-8">
        <article class="flex flex-row justify-center items-center gap-4">
            <button v-if="!quizStarted" @click="startQuiz"
                class=" text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 bg-[#f6c358] rounded-md p-1 hover:bg-[#bb820a]">START</button>
            <button v-else @click="stopQuiz" class="bg-[#f6c358] rounded-md p-1 hover:bg-[#bb820a]">{{ textButton }}</button>
        </article>
        <article v-if="quiz">
            <div class="flex flex-col justify-center items-center gap-2">
                <span v-if="category"> {{ category }} </span>
                <span v-if="difficulty"> {{ difficulty }} </span>
            </div>
            <h2 class="text-base font-semibold text-star mx-3  md:text-xl md:mx-10 lg:text-2xl">{{ quiz.question }}</h2>
            <form @submit.prevent="submitAnswer">
                <div v-for="(answer, index) in allAnswers" :key="index" class="flex flex-col justify-between items-center mx-2 mt-3">
                    <div class="flex flex-row justify-between items-center gap-2 w-full px-3 md:px-10">
                        <label :for="answer" class="text-base md:text-xl lg:text-2xl">{{ answer }}</label>
                        <input type="radio" :id="answer" :value="answer" v-model="selectedAnswer" class="w-12">
                    </div>
                </div>
                <button type="submit"
                    class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48  bg-[#f6c358] rounded-md p-1 hover:bg-[#bb820a] absolute bottom-0 mb-16 left-1/2 transform -translate-x-1/2">Check</button>
            </form>
        </article>
    </section>
</template>
<script setup>
import { ref, computed } from 'vue'
import Quiz from '../../services/Quiz.js'
import swal from 'sweetalert';
import eventBus from '../../EventBus.js'
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore()

let quiz = ref('respuesta')
// console.log(quiz.value)
let selectedAnswer = ref(null)
let category = ref('')
let difficulty = ref('')
let quizStarted = ref(false)
let userRegister = ref(authStore.idUser)
let textButton = ref('STOP')

if (userRegister.value) {
    textButton.value = 'SAVE'
}

const continueQuiz = () => {
    swal({
        title: 'Time is down!',
        text: 'Try again!',
        icon: 'info',
        button: 'Next',
        className: 'swal'
    }).then(() => {
        startQuiz()
    })
}

eventBus.on('countdownFinished', continueQuiz)

const startQuiz = async () => {
    let { results } = await Quiz.getQuiz()
    // console.log(results[0] , 'RESULTS')
    if (results) {
        quiz.value = results[0]
        category.value = results[0].category
        difficulty.value = results[0].difficulty
        const correctAnswer = decodeHtml(results[0].correct_answer)
        const incorrectAnswers = results[0].incorrect_answers.map(answer => decodeHtml(answer))
        allAnswers.value = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
        // console.log(allAnswers.value)
        selectedAnswer.value = null
        eventBus.emit('startCountdown')
        quizStarted.value = true
    }
}

const stopQuiz = () => {
    quiz.value = null
    quizStarted.value = false
    eventBus.emit('stopCountdown')
    saveScore()
}

const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const formattedQuestion = computed(() => decodeHtml(questionData.value.question));
const correctAnswer = computed(() => decodeHtml(questionData.value.correct_answer));
const incorrectAnswers = computed(() => questionData.value.incorrect_answers.map(answer => decodeHtml(answer)));

const allAnswers = ref([])

const submitAnswer = async () => {
    if (quiz.value && selectedAnswer.value === decodeHtml(quiz.value.correct_answer)) {
        // Incrementar la puntación o mostrar un mensaje de éxito
        swal({
            title: 'Correct',
            text: 'Good job!',
            icon: 'success',
            button: 'Next',
            className: 'swal'
        }).then(() => {
            startQuiz()
            eventBus.emit('')
        })
        eventBus.emit('difficulty',difficulty.value)

    } else {
        // Decrementar la puntuación o mostrar un mensaje de error
        swal({
            title: 'Incorrect',
            text: 'Try again!',
            icon: 'error',
            button: 'Next',
            className: 'swal'

        }).then(() => {
            startQuiz()
        })
    }
    eventBus.emit('restartCountdown')
}



const saveScore = async () => {
    if(!authStore.idUser) {
        console.log('There is no user')
        return
    }

    const response = await fetch('http://127.0.0.1:8000/api/user/update/' + authStore.idUser, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            id: authStore.idUser,
            score: authStore.storeScore
        })
    })
}



</script>

<style scoped>
.swal {
    background-color: #35AFAE;
    color: #EAF2E3;
}

</style>