<template>
  <section class="flex flex-row justify-between  w-svw h-auto px-2 py-4 text-[#EAF2E3] bg-[#35AFAE]   md:px-16    lg:px-20">
    <article>
        <router-link to="/">
            <img src="/img/logo/logo.svg" alt="logo" class="w-20 h-auto">
        </router-link>
    </article>
    <article>
        <nav>
            <ul class="flex flex-row justify-between items-center gap-3 text-lg font-bold  md:text-2xl md:font-extrabold md:gap-5 lg:gap-8">
                <li>
                    <router-link to="/" class=":hover-text-[#f6c358]">Home</router-link>
                </li>
                <li v-show="!userRegister">
                    <router-link to="login">Login</router-link>
                </li>
                <li v-show="!userRegister">
                    <router-link to="/register">Register</router-link>
                </li>
                <li v-show="userRegister">
                    <button @click="logoutUser">Logout</button>
                </li>
            </ul>
        </nav>
    </article>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.js';
import router from '@/router';

const authStore = useAuthStore();
const userRegister = ref(!!authStore.token)

watch(() => authStore.token, (token) => {
    userRegister.value = !!token;
    // console.log(userRegister.value, 'USUARIO REGISTRADO')
})

const logoutUser = () => {
    authStore.logout()
    userRegister.value = false
    router.push('/')
}
</script>

<style scoped>


</style>

