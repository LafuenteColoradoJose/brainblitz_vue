
<template>
  <header >

    <Layout>

      <RouterView />

    </Layout>
  
  </header>
</template>

<script setup>
import Layout from './Layouts/Layout.vue';

</script>

<style scoped>

header {
  background-image: url('/img/bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
}


</style>
