import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const user = ref(null)
    const idUser = ref('')
    const storeScore = ref(null)

    
    function login(newToken, newUser, newIdUser, newStoreScore) {
        token.value = newToken
        user.value = newUser
        idUser.value = newIdUser
        storeScore.value = newStoreScore

        // console.log('token', token.value)
        // console.log('user', user.value)
        // console.log('idUser', idUser.value)
        // console.log('storeScore', storeScore.value)
    }
    
    function logout() {
        token.value = ''
        user.value = null
        idUser.value = null
    }
    
    return { token, user, idUser, storeScore, login, logout }
})