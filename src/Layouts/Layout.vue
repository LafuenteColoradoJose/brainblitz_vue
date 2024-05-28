<template>
    <body class="flex flex-col items-center w-screen h-screen">
        <NavBar />
            <slot />
        <Footer />
    </body>
</template>

<script setup>
import NavBar from '../components/navbar/NavBar.vue';
import Footer from '../components/footer/Footer.vue';
</script>

<style scoped>


</style>
