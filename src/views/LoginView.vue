<template>
    <form class="flex flex-col justify-center items-center gap-10 h-screen">
      <div class="flex flex-col justify-start gap-10 ">
        <div class="flex flex-row justify-between">
          <label for="email" class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 mr-2">Email:</label>
          <input v-model="email" type="email" id="email" name="email" placeholder="email" class="border border-[#f6c358] active:border-[#bb820a] rounded-md">
        </div>
        <div class="flex flex-row justify-between">
          <label for="password" class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 mr-2">Password:</label>
          <input v-model="password" type="password" id="password" name="password" placeholder="password" class="border border-[#f6c358] active:border-[#bb820a] rounded-md">
        </div>


      </div>
      <div>
        <button @click.prevent="login" type="submit" class="bg-[#f6c358] rounded-md p-1 hover:bg-[#bb820a]">Login</button>
      </div>
    </form>
</template>


<script setup>
import { ref, computed } from 'vue'
import swal from 'sweetalert';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.js';


const email = ref('')
const password = ref('')
const url = 'http://127.0.0.1:8000/api/user/login'

const login = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email: email.value, 
      password: password.value })
  });

  if (response.status === 200) {
    const data = await response.json();
    swal("Good job!", "You clicked the button!", {
      className: "swal",
    });
    router.push('/quiz')
    // console.log('DATA:', data)
    useAuthStore().login(data.token, data.user.name, data.user.id, data.user.score)
  } else {
    swal("Error!", "You clicked the button!", {
      className: "swal",
    });

  }

}


</script>

<style scoped>
.swal {
  background-color: #35AFAE;
  color: #EAF2E3;
}
</style>

