<template>
    <form class="flex flex-col justify-center items-center h-screen gap-10">
      <div class="flex flex-col justify-start gap-10">
        <div class="flex flex-row justify-between">
          <label for="name" class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 mr-2">Name:</label>
          <input v-model="name" type="text" id="name" name="name" placeholder="name" class="border border-[#f6c358] active:border-[#bb820a] rounded-md">
        </div>
        <div class="flex flex-row justify-between">
          <label for="email" class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 mr-2">email:</label>
          <input v-model="email" type="email" id="email" email="email" placeholder="email" class="border border-[#f6c358] active:border-[#bb820a] rounded-md">
        </div>
        <div class="flex flex-row justify-between">
          <label for="password" class="text-base md:text-xl lg:text-2xl md:w-36 lg:w-48 mr-2">Password:</label>
          <input v-model="password" type="password" id="password" name="password" placeholder="password" class="border border-[#f6c358] active:border-[#bb820a] rounded-md">
        </div>
      </div>
      <div>
        <button @click.prevent="register" type="submit" class="bg-[#f6c358] rounded-md p-1 hover:bg-[#bb820a]">Register</button>
      </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import swal from 'sweetalert';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const name = ref('')
const email = ref('')
const password = ref('')
const token = ref('')

const register = async () => {

  try {

   const response = await fetch('http://127.0.0.1:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if(response.status === 200) {
      swal("Good job!", "You clicked the button!", "success", {
        className: "swal",
      });
      router.push('/login')
      useAuthStore().login(data.token)
      token.value = data.token
    } else {
      swal("Error!", "You clicked the button!", "error", {
        className: "swal",
      });
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.swal {
  background-color: #35AFAE;
  color: #EAF2E3;
}

</style>

